from fastapi import FastAPI, UploadFile, File
from fastapi.responses import StreamingResponse
from aura_sr import AuraSR
from PIL import Image
import io

app = FastAPI()

# AuraSR 모델 로딩
aura_sr = AuraSR.from_pretrained("fal/AuraSR-v2")
print("model load complete")

@app.post("/upscale")
async def upscale(file: UploadFile = File(...)):
    # 파일 읽기
    input_image = Image.open(io.BytesIO(await file.read())).convert("RGB")

    # 업스케일링
    output_image = aura_sr.upscale_4x_overlapped(input_image)

    # 결과 저장
    img_byte_arr = io.BytesIO()
    output_image.save(img_byte_arr, format="PNG")
    img_byte_arr.seek(0)

    return StreamingResponse(img_byte_arr, media_type="image/png")