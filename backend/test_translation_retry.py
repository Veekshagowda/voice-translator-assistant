from types import SimpleNamespace

from deep_translator.exceptions import TooManyRequests

from services.translator import translate_text


def test_translate_text_retries_after_too_many_requests(monkeypatch):
    calls = {"count": 0}

    def fake_translate(text, *args, **kwargs):
        calls["count"] += 1
        if calls["count"] == 1:
            raise TooManyRequests()
        return "Hola"

    def fake_batch_translate(batch, *args, **kwargs):
        calls["count"] += 1
        assert batch == ["Hello"]
        return ["Hola"]

    def fake_cached_translate(*args, **kwargs):
        raise RuntimeError(
            "Google Gemini translation failed: Server Error: You made too many requests to the server."
        )

    monkeypatch.setattr("services.translator.translate_text_cached", fake_cached_translate)
    monkeypatch.setattr(
        "services.translator.GoogleTranslator",
        lambda source, target: SimpleNamespace(
            translate=fake_translate,
            translate_batch=fake_batch_translate,
        ),
    )

    result = translate_text("Hello", "es")

    assert result == "Hola"
    assert calls["count"] == 2
