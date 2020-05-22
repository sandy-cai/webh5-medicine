const ZJFilter = {
    install(vue) {
        vue.filter('date', function(value, format) {
            if (!value) return '';
            var date = new Date(value);
            format = format ? format : 'yyyy-mm-dd';
            return vue.$plugin.date.formatWithPatternDate(format, date);
        })
    }
}

export {
    ZJFilter
};