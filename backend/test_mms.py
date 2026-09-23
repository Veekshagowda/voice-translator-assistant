from transformers import pipeline

print("===================================")
print("Loading MMS-LID-256...")
print("===================================")

classifier = pipeline(
    "audio-classification",
    model="facebook/mms-lid-256"
)

print("===================================")
print("✅ MMS-LID loaded successfully!")
print("===================================")