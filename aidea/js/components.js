// 内容块
class CustomTip extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
    }

    connectedCallback() {
        const title = this.getAttribute("title") || "Default Title";
        const content = this.innerHTML;
        const backgroundColor = this.getAttribute("color") || "#646cff24";
        const textColor = this.getAttribute("text_color") || "#3c3c43";

        this.shadowRoot.innerHTML = `
            <style>
                .custom-block.tip {
                    border-color: #00000000;
                    background-color: ${backgroundColor};
                    color: ${textColor};
                    border-radius: 8px;
                    padding: 16px 16px 8px;
                    line-height: 24px;
                }
                .custom-block-title {
                    font-weight: 700;
                }
                .custom-block p,a{
                    line-height: 24px;
                }
                .custom-block a{
                    font-size: 16px;
                    
                }
                .custom-block {
                margin: 16px 0;
                }
                @media (prefers-color-scheme: dark) {
                    .custom-block p,a {
                        color:#e1e1db;
                    }
                }
            </style>
            <div class="tip custom-block">
                <p class="custom-block-title">${title}</p>
                <p>${content}</p>
            </div>
        `;
    }
}

// 拖动条
class SeekBar extends HTMLElement {
    constructor() {
        super();

        // 创建 Shadow DOM
        const shadow = this.attachShadow({ mode: "open" });

        // 创建元素
        const label = document.createElement("label");
        const range = document.createElement("input");
        const valueDisplay = document.createElement("span");

        // 从自定义元素的属性中读取值
        const name = this.getAttribute("name") || "volume";
        const max = this.getAttribute("max") || 100;
        const min = this.getAttribute("min") || 0;
        const step = this.getAttribute("step") || 1;
        const value = this.getAttribute("value");
        const id = this.getAttribute("id") || "volume";
        const text = this.getAttribute("text");
        const title = this.getAttribute("title");
        const dataId =
            this.getAttribute("data-id") ||
            `SeekBar${Math.floor(Math.random() * 10000)}`;

        // 设置属性
        label.htmlFor = id;
        label.textContent = text;
        label.title = title;
        range.type = "range";
        range.id = id;
        range.name = name;
        range.min = min;
        range.max = max;
        range.value = value;
        range.step = step;
        valueDisplay.id = "value";
        valueDisplay.textContent = text;

        // 创建样式
        const style = document.createElement("style");
        style.textContent = `
            input[type="range"] {
                width: 200px;
                height: 20px;
                -webkit-appearance: none;
                appearance: none;
                background: #ccc;
                outline: none;
                border-radius: 10px;
                position: relative;
                box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
            }

            input[type="range"]::-webkit-slider-thumb {
                -webkit-appearance: none;
                appearance: none;
                width: 20px;
                height: 20px;
                background: white;
                cursor: pointer;
                border: 4px solid #2196f3;
                border-radius: 50%;
                position: relative;
                z-index: 1;
                top: 50%;
                transform: translateY(-50%);
            }

            input[type="range"]::-moz-range-thumb {
                width: 20px;
                height: 20px;
                background: white;
                cursor: pointer;
                border: 4px solid #2196f3;
                border-radius: 50%;
                position: relative;
                z-index: 1;
                top: 50%;
                transform: translateY(-50%);
            }

            input[type="range"]::-ms-thumb {
                width: 20px;
                height: 20px;
                background: white;
                cursor: pointer;
                border: 2px solid #2196f3;
                border-radius: 50%;
                position: relative;
                z-index: 1;
                top: 50%;
                transform: translateY(-50%);
            }

            input[type="range"]::-webkit-slider-runnable-track {
                background: linear-gradient(to right, #2196f3 0%, #2196f3 var(--value, 0%), #f3f4f6 var(--value, 0%), #f3f4f6 100%);
                height: 20px;
                border-radius: 10px;
            }

            input[type="range"]::-moz-range-track {
                background: linear-gradient(to right, #2196f3 0%, #2196f3 var(--value, 0%), #f3f4f6 var(--value, 0%), #f3f4f6 100%);
                height: 10px;
                border-radius: 10px;
            }

            input[type="range"]::-ms-fill-lower {
                background: #2196f3;
                border-radius: 10px;
            }

            input[type="range"]::-ms-fill-upper {
                background: #ccc;
                border-radius: 10px;
            }

            .container {
                display: flex;
                align-items: center;
                gap: 10px;
                color: #4e5155; /* 添加这一行 */
            }


        @media (prefers-color-scheme: dark) {
            input[type="range"]::-webkit-slider-runnable-track {
                background: linear-gradient(to right, #155488 0%, #155488 var(--value, 0%), #2d2e30 var(--value, 0%), #2d2e30 100%);
            }
            input[type="range"]::-moz-range-track {
                background: linear-gradient(to right, #155488 0%, #155488 var(--value, 0%), #2d2e30 var(--value, 0%), #2d2e30 100%);
            }
            input[type="range"] {
                background: #2d2e30;
            }

            input[type="range"]::-webkit-slider-thumb {
                background: #2d2e30;
                border: 2px solid #155488;
            }

            input[type="range"]::-moz-range-thumb {
                background: #2d2e30;
                border: 2px solid #155488;
            }

            input[type="range"]::-ms-thumb {
                background: #2d2e30;
                border: 2px solid #155488;
            }
            input[type="range"]::-ms-fill-lower {
                background: #155488;
            }
        }`;

        // 创建容器
        const container = document.createElement("div");
        container.className = "container";
        container.appendChild(label);
        container.appendChild(range);
        container.appendChild(valueDisplay);

        // 添加样式和容器到 Shadow DOM
        shadow.appendChild(style);
        shadow.appendChild(container);

        // 恢复初始值
        const savedValue = localStorage.getItem(`SeekBar${dataId}`);
        if (savedValue) {
            range.value = savedValue;
            valueDisplay.textContent = savedValue;
        } else {
            if (value) {
                localStorage.setItem(`SeekBar${dataId}`, value);
                range.value = savedValue;
                valueDisplay.textContent = value;
            }
        }

        // 监听输入事件，更新显示的值并保存到 localStorage
        range.addEventListener("input", function () {
            valueDisplay.textContent = this.value;
            localStorage.setItem(`SeekBar${dataId}`, this.value);

            // 更新已拖动部分的颜色
            const percent = ((this.value - this.min) / (this.max - this.min)) * 100;
            this.style.setProperty("--value", `${percent}%`);
        });

        // 初始设置已拖动部分的颜色
        const initialPercent =
            ((range.value - range.min) / (range.max - range.min)) * 100;
        range.style.setProperty("--value", `${initialPercent}%`);
    }
}

// 注册自定义元素
customElements.define("seek-bar", SeekBar);
customElements.define("custom-tip", CustomTip);
