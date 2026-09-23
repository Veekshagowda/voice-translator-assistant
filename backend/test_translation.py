from services.translator import translate_text


result = translate_text(
    "Hi, my name is Veeksha. How are you?",
    "kn"
)

print("\nFINAL TRANSLATION:")
print(result)