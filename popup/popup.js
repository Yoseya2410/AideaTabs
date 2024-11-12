// 初始化所有开关
function initializeToggles() {
    const toggles = document.querySelectorAll('.switch input[type="checkbox"]'); // 获取所有开关输入框
    toggles.forEach((toggle, index) => { // 遍历每个开关
        const key = `set${index + 1}`; // 生成对应的 localStorage 键名
        const value = localStorage.getItem(key); // 从 localStorage 中获取值
        if (value === '1') { // 如果值为 '1'
            toggle.checked = true; // 设置开关为选中状态
        } else {
            toggle.checked = false; // 否则设置开关为未选中状态
        }
    });
}

// 为每个开关添加 change 事件监听器
function addChangeListeners() {
    const toggles = document.querySelectorAll('.switch input[type="checkbox"]'); // 获取所有开关输入框
    toggles.forEach((toggle, index) => { // 遍历每个开关
        toggle.addEventListener('change', function () { // 添加 change 事件监听器
            const key = `set${index + 1}`; // 生成对应的 localStorage 键名
            if (this.checked) { // 如果开关被选中
                localStorage.setItem(key, '1'); // 将值设置为 '1'
                console.log(`项目${index + 1}开关已打开，localStorage: ${key} = 1`); // 输出日志
            } else {
                localStorage.removeItem(key); // 如果开关未被选中，移除对应的键值对
                console.log(`项目${index + 1}开关已关闭，localStorage: ${key} = null`); // 输出日志
            }
        });
    });
}


// 智慧搜索模型选择事件
const model_list = document.getElementById('model_list');
model_list.addEventListener('change', function () {
    const selectedValue = this.value;
    localStorage.setItem('modelclass', selectedValue);
});


// 页面加载时初始化开关状态
window.onload = function () {
    initializeToggles(); // 初始化所有开关的状态
    addChangeListeners(); // 为每个开关添加 change 事件监听器
//智慧搜索下拉菜单初始化
    const savedValue = localStorage.getItem('modelclass');
    if (savedValue) {
        model_list.value = savedValue;
    }
};