/*导入文件资源*/
class importFile {
    // 导入JS文件的方法
    js(src) {
        return new Promise((resolve, reject) => {
            const script = document.createElement('script');
            script.src = src;
            script.type = 'text/javascript';
            script.onload = () => resolve(script);
            script.onerror = (err) => reject(err);
            document.head.appendChild(script);
        });
    }

    // 导入CSS文件的方法
    css(href) {
        return new Promise((resolve, reject) => {
            const link = document.createElement('link');
            link.href = href;
            link.type = 'text/css';
            link.rel = 'stylesheet';
            link.onload = () => resolve(link);
            link.onerror = (err) => reject(err);
            document.head.appendChild(link);
        });
    }
}
