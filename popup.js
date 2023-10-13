const fileInput = document.getElementById("upload");
const previewImg = document.getElementById("preview");

document.getElementById("btnUpload").addEventListener("click", openDialog);

function openDialog() {
  document.getElementById("upload").click();
  document.getElementById("uploadBtnContainer").style.display = "none";
  document.getElementById("resizeImage").style.display = "flex";
}

fileInput.addEventListener("change", () => {
  if (!fileInput.files.length) return;

  const file = fileInput.files[0];
  previewImg.src = URL.createObjectURL(file);
  console.log(URL.createObjectURL(file));
});

document
  .getElementById("resizeAndDownload")
  .addEventListener("click", async () => {
    const width = document.getElementById("width").value;
    const height = document.getElementById("height").value;
    if (width <= 0 || height <= 0)
      return alert("Width or height value cannot be smaller than zero.");
    if (!fileInput.files.length) return alert("Please upload an image first.");

    const file = fileInput.files[0];
    const img = new Image();

    img.onload = function () {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      //   const scaleFactor = width / img.width;
      //   const height = img.height * scaleFactor;

      canvas.width = width;
      canvas.height = height;

      ctx.drawImage(img, 0, 0, width, height);

      canvas.toBlob((blob) => {
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "resized-image.png";
        a.click();
      }, "image/png");
    };

    img.src = URL.createObjectURL(file);
  });
