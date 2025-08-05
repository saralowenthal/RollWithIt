import { useTheme } from "../contexts/ThemeContext";

const colorInputs = [
  { name: "primaryColor", label: "Primary Accent" },
  { name: "secondaryColor", label: "Secondary Accent" },
  { name: "backgroundColor", label: "Background" },
  { name: "textColor", label: "Text" },
];

const fontOptions = [
  { value: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif", label: "Segoe UI (Default)", preview: "Segoe UI" },
  { value: "'Fira Sans', sans-serif", label: "Fira Sans", preview: "Fira Sans" },
  { value: "'Quicksand', sans-serif", label: "Quicksand", preview: "Quicksand" },
  { value: "'Space Grotesk', sans-serif", label: "Space Grotesk", preview: "Space Grotesk" },
  { value: "'EB Garamond', serif", label: "EB Garamond", preview: "Garamond" },
  { value: "'Pacifico', cursive", label: "Pacifico (Handwriting)", preview: "Pacifico" },
];

function ThemeCustomizer() {
  const { themeSettings, updateTheme } = useTheme();

  const handleChange = (e) => {
    const { name, value } = e.target;
    updateTheme({ [name]: value });
  };

  return (
    <form className="card shadow border-0 p-3" style={{ minWidth: "320px", maxWidth: "500px", backgroundColor: 'white' }}>
      <div className="card-body">
        <h5 className="card-title mb-4 text-primary fw-semibold">🎨 Theme Customizer</h5>

        {/* Color Inputs */}
        <div className="mb-4">
          {colorInputs.map(({ name, label }) => (
            <div className="mb-3 d-flex align-items-center justify-content-between" key={name}>
              <label htmlFor={name} className="form-label mb-0 flex-grow-1">
                {label}
              </label>
              <input
                type="color"
                id={name}
                name={name}
                value={themeSettings[name]}
                onChange={handleChange}
                className="form-control form-control-color ms-3"
                title={label}
              />
            </div>
          ))}
        </div>

        {/* Font Selector */}
        <div className="mb-2">
          <label htmlFor="fontFamily" className="form-label mb-1">
            Font Family
          </label>
          <select
            id="fontFamily"
            name="fontFamily"
            className="form-select"
            value={themeSettings.fontFamily}
            onChange={handleChange}
          >
            {fontOptions.map(({ value, label, preview }) => (
              <option key={value} value={value} style={{ fontFamily: value }}>
                {label}
              </option>
            ))}
          </select>
        </div>
      </div>
    </form>
  );
}

export default ThemeCustomizer;
