import { useRef, useState } from "react";
import toast from "react-hot-toast";

export default function App() {
  const [inputImage, setInputImage] = useState(null);
  const [background, setBackground] = useState("#FFFFFF");
  const copyhexRef = useRef(null);

  // ARMAZENDO API CONTA GOTAS
  const eyeDropper = new EyeDropper();

  function colorPicker() {
    eyeDropper
      .open()
      .then((color) => {
        setBackground(color.sRGBHex);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  async function copyColorHex(color) {
    try {
      await navigator.clipboard.writeText(color);

      toast.success("Copiado para área de transferência", {
        style: {
          background: "#333",
          color: "#fff",
        },
      });
    } catch (error) {
      console.log(error);
    }
  }

  function updateImageDisplay(e) {
    const file = e.target.files[0];
    const fileName = URL.createObjectURL(file);

    setInputImage(fileName);

    console.log(fileName);
  }

  return (
    <div className="max-w-5xl mx-auto p-4">
      <section className="bg-white rounded-md flex items-center w-full p-4">
        <form className="flex flex-col flex-1 gap-4">
          <label
            className="block font-semibold text-slate-900 text-2xl"
            htmlFor="img_upload"
          >
            Selecione a imagem
          </label>
          <input
            onChange={updateImageDisplay}
            name="img_upload"
            type="file"
            id="img_upload"
            accept=".jpg,.jpeg,.png,.webp"
          />
          <div className="border rounded flex justify-center items-center h-[400px] w-[400px]">
            {inputImage && (
              <img
                className="max-w-full"
                src={inputImage}
                alt="Image selecionada"
              />
            )}
          </div>
        </form>

        <div className="bg-slate-100 flex flex-col gap-3 p-2 flex-1">
          <header className="bg-slate-800 p-2 text-white rounded">
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-full bg-red-500"></div>
              <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
              <div className="h-3 w-3 rounded-full bg-green-500"></div>
            </div>
          </header>

          <main className="mt-4 flex items-start gap-3">
            <div
              style={{ background: background }}
              className="h-20 w-24 border border-black rounded"
            ></div>
            <div className="flex flex-col w-full gap-2">
              <h2 className="text-xl font-semilbold">Cor</h2>
              <div className="flex justify-between p-2 bg-white">
                <h2 className="font-semibold">
                  HEX: <span ref={copyhexRef}>{background}</span>
                </h2>
                <button
                  onClick={() => copyColorHex(copyhexRef.current.innerText)}
                  className="bg-slate-700 text-white py-1 rounded px-3"
                >
                  Copiar
                </button>
              </div>
            </div>
          </main>

          <button
            className={`bg-sky-500 p-2 text-xl text-white rounded font-bold ${
              inputImage === null ? "cursor-not-allowed" : false
            }`}
            onClick={colorPicker}
            disabled={inputImage === null ? true : false}
          >
            Conta gotas
          </button>
        </div>
      </section>
    </div>
  );
}
