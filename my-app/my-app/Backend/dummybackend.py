from fastapi import FastAPI,Request,HTTPException
import uvicorn
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

origins = ["*"]

app.add_middleware(CORSMiddleware,
                    allow_origins=origins,
                    allow_credentials=True,
                    allow_methods=["*"],
                    allow_headers=["*"],)

    
@app.post("/message")
async def get_response(item:dict):
    response = {'status':True}
    msg = item['input']
    response['output'] = msg
    return response



if __name__ == "__main__":
    # mistrom_model = Model()
    uvicorn.run(app, host="0.0.0.0", port=8002)