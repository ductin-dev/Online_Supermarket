import { FC, useState, useEffect } from "react";

const PhotoUploader: FC<any> = ({
  title = "Photo Uploader",
  description = " PNG, JPG, GIF up to 10MB (muiltifile)",
  error = false,
  onChange = () => {},
  multiple = false,
  acceptedType = ["image/jpeg", "image/png", "image/gif", "image/jpg"],
}) => {
  const [state, setState] = useState({
    Images: [],
    Prev_Images: [],
    ImgBase64: "",
  });
  const [hadUploadImage, setHadUploadImage] = useState(false);
  const [dropImageStyles, setDropImageStyles] = useState({});

  //Lifiting
  useEffect(() => {
    onChange(state);
  }, [state]);

  //Style
  useEffect(() => {
    setDropImageStyles(
      hadUploadImage ? { borderColor: "blueviolet" } : { borderColor: "" }
    );
  }, [hadUploadImage]);

  //Image Function
  const resetImage = () => {
    setState({
      Images: [],
      Prev_Images: [],
      ImgBase64: "",
    });
    setHadUploadImage(false);
  };
  const uploadImageHandler = (e: any) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      Promise.all(
        files.map((file: any) => {
          return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.addEventListener("load", (ev: any) => {
              resolve(ev.target.result);
            });
            reader.addEventListener("error", reject);
            reader.readAsDataURL(file);
          });
        })
      ).then(
        (images) => {
          setState({
            Images: e.target.files,
            Prev_Images: images as any,
            ImgBase64: images[0] as any,
          });
        },
        (error) => {
          console.error(error);
        }
      );
      setHadUploadImage(true);
    }
  };
  const dropImageHandler = (e: any) => {
    e.preventDefault();
    if (e.dataTransfer.files) {
      const files = Array.from(e.dataTransfer.files);
      files.map((file: any) => {
        if (acceptedType.indexOf(file?.type) === -1) {
          alert("File ảnh này không được hỗ trợ");
          return false;
        }
        return true;
      });
      Promise.all(
        files.map((file: any) => {
          return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.addEventListener("load", (ev: any) => {
              resolve(ev.target.result);
            });
            reader.addEventListener("error", reject);
            reader.readAsDataURL(file);
          });
        })
      ).then(
        (images) => {
          setState({
            Images: files as any,
            Prev_Images: images as any,
            ImgBase64: images[0] as any,
          });
        },
        (error) => {
          console.error(error);
        }
      );
      setHadUploadImage(true);
    }
  };
  const dragImageHandler = (e: any) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
    setDropImageStyles({ borderColor: "blueviolet" });
  };

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700">{title}</label>
      <div className="container grid grid-cols-8 gap-2 mx-auto">
        {state.Prev_Images.map((i, index) => (
          <div key={index} className="w-full rounded">
            <img src={i} alt="X" style={{ borderRadius: 8 }} />
          </div>
        ))}
      </div>
      <div
        onDrop={(e) => dropImageHandler(e)}
        onDragStart={(e) => {
          e.dataTransfer.setData("text", "data");
          e.dataTransfer.effectAllowed = "move";
        }}
        onDragOver={(e) => dragImageHandler(e)}
        onDragLeave={() => setDropImageStyles({ borderColor: "" })}
        className={
          !error
            ? "mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md"
            : "mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-red-500 border-dashed rounded-md"
        }
        style={dropImageStyles}
      >
        <div className="space-y-1 text-center">
          <svg
            className="mx-auto h-12 w-12 text-gray-400"
            stroke="currentColor"
            fill="none"
            viewBox="0 0 48 48"
            aria-hidden="true"
          >
            <path
              d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <div className="flex text-sm text-gray-600">
            <label
              htmlFor="file-upload"
              className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
            >
              <span>Upload a file</span>
              <input
                id="file-upload"
                name="image"
                type="file"
                className="sr-only"
                onChange={(e) => uploadImageHandler(e)}
                accept={acceptedType.toString()}
                multiple={multiple}
              />
            </label>
            <p className="pl-1">or drag and drop</p>
          </div>
          <p className="text-xs text-gray-500">{description}</p>
          {hadUploadImage && (
            <>
              <hr></hr>
              <span
                onClick={() => resetImage()}
                className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
              >
                Reset Image
              </span>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
export default PhotoUploader;
