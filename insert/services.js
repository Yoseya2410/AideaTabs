document.addEventListener('DOMContentLoaded', function () {
  // 检测编辑模式是否关闭，如果没有则继续开启编辑模式
  var altpg = window.localStorage.getItem("altpg");
  if (altpg == "1") {
    document.body.contentEditable = "true";
    document.designMode = "on";
    void 0;
  }

  /*快捷键功能*/
  document.onkeydown = onKeyDown;
  function onKeyDown() {
    // Alt+G 自由编辑
    var altpg = window.localStorage.getItem("altpg");
    if (window.event.altKey && window.event.keyCode === 71) {
      if (altpg == null || altpg == "null" || altpg == "") {
        var isbeauty = confirm("你要启动编辑模式吗？");
        if (isbeauty == true) {
          document.body.contentEditable = "true";
          document.designMode = "on";
          void 0;
          window.localStorage.setItem("altpg", "1");
        }
      } else {
        var isbeauty = confirm("你要关闭编辑模式吗？");
        if (isbeauty == true) {
          document.body.contentEditable = "false";
          void 0;
          window.localStorage.removeItem("altpg");
          altpg = null;
        }
      }
    }
  }

  // Ctrl+空格 提示框
  const tooltip = document.createElement('div');
  tooltip.style.position = 'absolute';
  tooltip.style.backgroundColor = 'rgba(0, 0, 0, 0.7)'; 
  tooltip.style.color = 'white'; 
  tooltip.style.padding = '5px';
  tooltip.style.borderRadius = '3px';
  tooltip.style.maxWidth = '300px';
  tooltip.style.maxHeight = '410px';
  tooltip.style.whiteSpace = 'pre-wrap';
  tooltip.style.wordBreak = 'break-all';
  tooltip.style.display = 'none';
  tooltip.style.zIndex = '99'; 
  tooltip.style.overflow = 'hidden'; 
  tooltip.style.textOverflow = 'ellipsis'; 
  tooltip.style.display = '-webkit-box';
  tooltip.style.webkitLineClamp = '5';
  tooltip.style.lineHeight = '1.6'; 
  tooltip.style.borderRadius = "10px"
  tooltip.style.fontSize = '16px';
  document.body.appendChild(tooltip);

  let currentTarget = null;

  // 鼠标悬停事件处理
  document.addEventListener('mouseover', function (event) {
    const target = event.target;
    // 获取元素的id，class，标签名
    const id = target.id ? `#${target.id}` : '';
    const classes = target.className ? `.${(target.className + '').split(' ').join('.')}` : '';
    const tabName = `${target.tagName.toLowerCase()}`;

    // 悬停时显示元素标签名
    tooltip.textContent = tabName;
    currentTarget = target;
  });

  // 鼠标移出事件处理
  document.addEventListener('mouseout', function (event) {
    const target = event.target;
    target.style.outline = '';
    tooltip.style.display = 'none'; // 隐藏提示框
    currentTarget = null; // 清除当前悬停的元素
  });

  // 鼠标移动事件处理
  document.addEventListener('mousemove', function (event) {
    if (currentTarget) {
      const left = event.pageX + 10; // 避免鼠标指针遮挡提示框
      const top = event.pageY + 10;  // 避免鼠标指针遮挡提示框

      // 更新提示框的位置
      tooltip.style.left = `${left}px`;
      tooltip.style.top = `${top}px`;
    }
  });

  // 获取选中的文本
  function getSelectedText() {
    let text = '';
    if (window.getSelection) {
      text = window.getSelection().toString();
    } else if (document.selection && document.selection.type !== 'Control') {
      text = document.selection.createRange().text;
    }
    return text;
  }

  document.addEventListener('keydown', function (event) {
    const textElements = ['p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'a', 'em', 'i', 'b', 'strong', 'li', 'span', 'input'];

    if (event.key === ' ' && event.ctrlKey && currentTarget) {
      const selectedText = getSelectedText();

      // 如果提示框已经显示，则检查选中的文本
      if (tooltip.style.display === 'block') {
        tooltip.style.display = 'none'; // 无论选中文本与否，都隐藏提示框
      } else {
        // 如果有选中的文本，显示选中的文本；否则显示当前悬停元素的文本
        if (selectedText) {
          tooltip.textContent = selectedText;
          console.log(selectedText);
          tooltip.style.display = 'block';
          currentTarget.style.outline = '';
        } else {
          // 检查当前悬停的元素是否是文本元素
          if (textElements.includes(currentTarget.tagName.toLowerCase())) {
            tooltip.textContent = currentTarget.textContent;
            tooltip.style.display = 'block';
          } else {
            tooltip.style.display = 'none'; 
          }
        }
      }
    }

    if (event.key === 'Control' && currentTarget) {
      // 检查当前悬停的元素是否是文本元素
      if (textElements.includes(currentTarget.tagName.toLowerCase())) {
        currentTarget.style.outline = '1px solid #007acc';
      }
    }

    //鼠标点击事件
    document.addEventListener('mousedown', function (event) {
      if (event.button === 0 || 1 || 2) { 
        tooltip.style.display = 'none';
      }
    });

  });



});