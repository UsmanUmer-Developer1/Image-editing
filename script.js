// ---------------- NEW FILTERS + TRANSFORM ----------------
let filters = {
    brightness: { value: 100, min: 0, max: 200, unit: "%" },
    contrast: { value: 100, min: 0, max: 200, unit: "%" },
    saturation: { value: 100, min: 0, max: 200, unit: "%" },
    hueRotation: { value: 0, min: 0, max: 360, unit: "deg" },
    blur: { value: 0, min: 0, max: 20, unit: "px" },
    greyscale: { value: 0, min: 0, max: 100, unit: "%" },
    sepia: { value: 0, min: 0, max: 100, unit: "%" },
    opacity: { value: 100, min: 0, max: 100, unit: "%" },
    invert: { value: 0, min: 0, max: 100, unit: "%" },
};


const imageCanvas = document.querySelector("#image-canvas")
const imgInput = document.querySelector("#image-input")
const filtersContainer = document.querySelector(".filters")
const canvasCtx = imageCanvas.getContext("2d")
const resetBtn = document.querySelector("#reset-btn")
const downloadButton = document.querySelector("#download-btn")
const presetsContainer = document.querySelector(".presets")

let originalImage = null   // ✅ correct global image

// ---------------- SLIDERS ----------------
function createFilterElement(name, value, min, max) {
    const div = document.createElement("div")
    div.classList.add("filter")

    const p = document.createElement("p")
    p.innerText = name

    const input = document.createElement("input")
    input.type = "range"
    input.min = min
    input.max = max
    input.value = value

    input.addEventListener("input", () => {
        filters[name].value = input.value
        applyFilters()
    })

    div.appendChild(p)
    div.appendChild(input)
    return div
}




function createFilters(){
    Object.keys(filters).forEach(key => {
        const f = filters[key]
        filtersContainer.appendChild(
            createFilterElement(key, f.value, f.min, f.max)
        )
    })
}
createFilters()

// ---------------- IMAGE UPLOAD ----------------
imgInput.addEventListener("change", (event) => {
    const placeholder = document.querySelector(".placeholder")
    imageCanvas.style.display = "block"
    if (placeholder) placeholder.style.display = "none"

    const file = event.target.files[0]
    if (!file) return

    const img = new Image()
    img.src = URL.createObjectURL(file)

    img.onload = () => {
        originalImage = img   // ✅ save image

        imageCanvas.width = img.width
        imageCanvas.height = img.height

        applyFilters()
    }
})

// ---------------- APPLY FILTERS ----------------
function applyFilters() {
    if (!originalImage) return

    canvasCtx.clearRect(0, 0, imageCanvas.width, imageCanvas.height)

    canvasCtx.filter = `
        brightness(${filters.brightness.value}%)
        contrast(${filters.contrast.value}%)
        saturate(${filters.saturation.value}%)
        hue-rotate(${filters.hueRotation.value}deg)
        blur(${filters.blur.value}px)
        grayscale(${filters.greyscale.value}%)
        sepia(${filters.sepia.value}%)
        invert(${filters.invert.value}%)
        opacity(${filters.opacity.value}%)
    `

    canvasCtx.drawImage(originalImage, 0, 0)
}



resetBtn.addEventListener("click", () => {
  filters = {
    brightness: { value: 100, min: 0, max: 200, unit: "%" },
    contrast: { value: 100, min: 0, max: 200, unit: "%" },
    saturation: { value: 100, min: 0, max: 200, unit: "%" },
    hueRotation: { value: 0, min: 0, max: 360, unit: "deg" },
    blur: { value: 0, min: 0, max: 20, unit: "px" },
    greyscale: { value: 0, min: 0, max: 100, unit: "%" },
    sepia: { value: 0, min: 0, max: 100, unit: "%" },
    opacity: { value: 100, min: 0, max: 100, unit: "%" },
    invert: { value: 0, min: 0, max: 100, unit: "%" }
}
applyFilters()

filtersContainer.innerHTML = ""
createFilters()
})


downloadButton.addEventListener("click", () => {
    const link = document.createElement("a")
    link.download = "edited-image.png"
    link.href = imageCanvas.toDataURL()   // ✅ Correct
    link.click()
})



const presets = {
    Drama: {
        brightness: 120,
        contrast: 150,
        saturation: 80,
        hueRotation: 0,
        blur: 0,
        greyscale: 0,
        sepia: 0,
        opacity: 100,
        invert: 0
    },
    Vintage: {
        brightness: 110,
        contrast: 120,
        saturation: 70,
        hueRotation: 20,
        blur: 0,
        greyscale: 0,
        sepia: 30,
        opacity: 100,
        invert: 0
    },
    OldSchool: {
        brightness: 90,
        contrast: 130,
        saturation: 50,
        hueRotation: 0,
        blur: 1,
        greyscale: 20,
        sepia: 50,
        opacity: 100,
        invert: 0
    },
    BlackAndWhite: {
        brightness: 100,
        contrast: 140,
        saturation: 0,
        hueRotation: 0,
        blur: 0,
        greyscale: 100,
        sepia: 0,
        opacity: 100,
        invert: 0
    },
    Cinematic: {
        brightness: 95,
        contrast: 160,
        saturation: 90,
        hueRotation: 5,
        blur: 0,
        greyscale: 0,
        sepia: 10,
        opacity: 100,
        invert: 0
    },
    SoftGlow: {
        brightness: 130,
        contrast: 100,
        saturation: 120,
        hueRotation: 0,
        blur: 2,
        greyscale: 0,
        sepia: 20,
        opacity: 100,
        invert: 0
    },
    Retro: {
        brightness: 110,
        contrast: 110,
        saturation: 80,
        hueRotation: 30,
        blur: 0,
        greyscale: 0,
        sepia: 40,
        opacity: 100,
        invert: 0
    },

    // ✅ New Presets (8)
    Warm: {
        brightness: 115,
        contrast: 105,
        saturation: 130,
        hueRotation: 10,
        blur: 0,
        greyscale: 0,
        sepia: 15,
        opacity: 100,
        invert: 0
    },
    Cool: {
        brightness: 95,
        contrast: 110,
        saturation: 90,
        hueRotation: -10,
        blur: 0,
        greyscale: 0,
        sepia: 0,
        opacity: 100,
        invert: 0
    },
    Faded: {
        brightness: 105,
        contrast: 80,
        saturation: 60,
        hueRotation: 0,
        blur: 0,
        greyscale: 10,
        sepia: 20,
        opacity: 100,
        invert: 0
    },
    Vivid: {
        brightness: 120,
        contrast: 140,
        saturation: 160,
        hueRotation: 0,
        blur: 0,
        greyscale: 0,
        sepia: 0,
        opacity: 100,
        invert: 0
    },
    Moody: {
        brightness: 85,
        contrast: 150,
        saturation: 70,
        hueRotation: 0,
        blur: 0,
        greyscale: 20,
        sepia: 10,
        opacity: 100,
        invert: 0
    },
    Dreamy: {
        brightness: 135,
        contrast: 90,
        saturation: 110,
        hueRotation: 0,
        blur: 3,
        greyscale: 0,
        sepia: 10,
        opacity: 100,
        invert: 0
    },
    Night: {
        brightness: 80,
        contrast: 170,
        saturation: 60,
        hueRotation: 0,
        blur: 0,
        greyscale: 10,
        sepia: 0,
        opacity: 100,
        invert: 0
    },
    InvertColors: {
        brightness: 100,
        contrast: 100,
        saturation: 100,
        hueRotation: 0,
        blur: 0,
        greyscale: 0,
        sepia: 0,
        opacity: 100,
        invert: 100
    }
};


Object.keys(presets).forEach(presetName => {
    const presetButton = document.createElement("button")
    presetButton.classList.add("btn")
    presetButton.innerText = presetName
    presetsContainer.appendChild(presetButton)


    presetButton.addEventListener('click', ()=> {
      const preset = presets[presetName]  

      Object.keys(preset).forEach(filterName => {
        filters[ filterName ].value = preset[ filterName ]
      })
      applyFilters()
    })
})




