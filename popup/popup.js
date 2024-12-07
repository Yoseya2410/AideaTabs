// 初始化所有开关
function initializeToggles() {
    const toggles = document.querySelectorAll('.switch input[type="checkbox"]'); // 获取所有开关输入框
    toggles.forEach((toggle, index) => {
        // 遍历每个开关
        const key = `set${index + 1}`; // 生成对应的 localStorage 键名
        const value = localStorage.getItem(key); // 从 localStorage 中获取值
        if (value) {
            // 如果值为 '1'
            toggle.checked = true; // 设置开关为选中状态
        } else {
            toggle.checked = false; // 否则设置开关为未选中状态
        }
    });
}

// 初始化大模型设置列表
function InitializeModelSetList() {
    const def_Set = document.getElementById("def_Set");
    const AideaIntelligence_Set = document.getElementById("AideaIntelligence_Set");
    const Qwen_Set = document.getElementById("Qwen_Set");
    const Moonshot_Set = document.getElementById("Moonshot_Set");
    const OpenAI_Set = document.getElementById("OpenAI_Set");
    
    const modelclass = localStorage.getItem("modelclass");

    // 先把所有模型的设置列表隐藏
    def_Set.style.display = "none";
    AideaIntelligence_Set.style.display = "none";
    Qwen_Set.style.display = "none";
    Moonshot_Set.style.display = "none";
    OpenAI_Set.style.display = "none";
   

    //再显示当前使用模型的设置列表
    if (modelclass == "Aidea") {
        AideaIntelligence_Set.style.display = "inline";
    } else if (modelclass == "defmodel") {
        def_Set.style.display = "inline";
    } else if (modelclass == "Qwen") {
        Qwen_Set.style.display = "inline";
    } else if (modelclass == "Moonshot") {
        Moonshot_Set.style.display = "inline";
    } else if (modelclass == "OpenAI") {
        OpenAI_Set.style.display = "inline";
    } else {
    }
}

// 为每个开关添加 change 事件监听器
function addChangeListeners() {
    const toggles = document.querySelectorAll('.switch input[type="checkbox"]'); // 获取所有开关输入框
    toggles.forEach((toggle, index) => {
        // 遍历每个开关
        toggle.addEventListener("change", function () {
            // 添加 change 事件监听器
            const key = `set${index + 1}`; // 生成对应的 localStorage 键名
            if (this.checked) {
                // 如果开关被选中
                localStorage.setItem(key, JSON.stringify(true)); // 将值设置为 '1'
                //console.log(`项目${index + 1}开关已打开，localStorage: ${key} = 1`); // 输出日志
            } else {
                localStorage.removeItem(key); // 如果开关未被选中，移除对应的键值对
                //console.log(`项目${index + 1}开关已关闭，localStorage: ${key} = null`); // 输出日志
            }
        });
    });
}

// 智慧搜索模型选择事件
const model_list = document.getElementById("model_list");
model_list.addEventListener("change", function () {
    const selectedValue = this.value;
    localStorage.setItem("modelclass", selectedValue);
    InitializeModelSetList(); //刷新模型设置列表
});

// 在API密钥输入框中显示保存的密钥
function inputShowAPI() {
    const def_input = document.getElementById("def_input");
    const def_input_url = document.getElementById("def_input_url");
    const def_input_type = document.getElementById("def_input_type");
    const QwenKey_input = document.getElementById("QwenKey_input");
    const MoonshotKey_input = document.getElementById("MoonshotKey_input");
    const OpenAI_input = document.getElementById("OpenAI_input");

    const def_interface = localStorage.getItem("def_interface");
    const def_modelType = localStorage.getItem("def_modelType");
    const apikey0 = localStorage.getItem("apikey0");
    const apikey1 = localStorage.getItem("apikey1");
    const apikey2 = localStorage.getItem("apikey2");
    const apikey3 = localStorage.getItem("apikey3");

    if (def_interface) {
        def_input_url.value = def_interface;
    }
    if (def_modelType) {
        def_input_type.value = def_modelType;
    }
    if (apikey0) {
        def_input.value = apikey0;
    }
    if (apikey1) {
        QwenKey_input.value = apikey1;
    }
    if (apikey2) {
        MoonshotKey_input.value = apikey2;
    }
    if (apikey3) {
        OpenAI_input.value = apikey3;
    }


}

// 离开输入框自动保存API密钥
document.addEventListener('DOMContentLoaded', function () {
    const def_input = document.getElementById("def_input");
    const def_input_url = document.getElementById("def_input_url");
    const def_input_type = document.getElementById("def_input_type");
    const QwenKey_input = document.getElementById("QwenKey_input");
    const MoonshotKey_input = document.getElementById("MoonshotKey_input");
    const OpenAI_input = document.getElementById("OpenAI_input");

    /*自定义模型配置*/
    def_input.addEventListener('blur', function () {
        localStorage.setItem("apikey0", def_input.value);
    });
    def_input_url.addEventListener('blur', function () {
        localStorage.setItem("def_interface", def_input_url.value);
    });
    def_input_type.addEventListener('blur', function () {
        localStorage.setItem("def_modelType", def_input_type.value);
    });

    QwenKey_input.addEventListener('blur', function () {
        localStorage.setItem("apikey1", QwenKey_input.value);
    });
    MoonshotKey_input.addEventListener('blur', function () {
        localStorage.setItem("apikey2", MoonshotKey_input.value);
    });
    OpenAI_input.addEventListener('blur', function () {
        localStorage.setItem("apikey3", OpenAI_input.value);
    });


});
// 与 index 页面通信
document.addEventListener('DOMContentLoaded', function () {
    const instructionsButton = document.getElementById('instructions');

    instructionsButton.addEventListener('click', function () {
        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
            chrome.tabs.sendMessage(tabs[0].id, { action: 'showInstructions' });
        });
    });
});

// 页面加载时初始化开关状态
window.onload = function () {
    initializeToggles(); // 初始化所有开关的状态
    InitializeModelSetList(); //初始化大模型设置列表
    inputShowAPI() // 在API密钥输入框中显示保存的密钥
    addChangeListeners(); // 为每个开关添加 change 事件监听器

    // 初始化版本号
    const manifest = chrome.runtime.getManifest(); // 获取 manifest.json 的内容
    const versionWrap = document.getElementById('versionWrap');
    versionWrap.textContent = 'V' + manifest.version;

    //智慧搜索下拉菜单初始化
    const savedValue = localStorage.getItem("modelclass");
    if (savedValue) {
        model_list.value = savedValue;
    }

};
