import iView from 'iview';

export default {
  install (vue) {
    const message = (content, type, option) => {
      iView.Message[type || 'info'](Object.assign({
        content: content,
      }, option || {}));
    };

    // all lf's plugins are included in this.$lf
    if (!vue.$lf) {
      vue.$lf = {
        message,
      };
    } else {
      vue.$lf.message = message;
    }

    vue.mixin({
      created: function () {
        this.$lf = vue.$lf;
      },
    });
  },
};
