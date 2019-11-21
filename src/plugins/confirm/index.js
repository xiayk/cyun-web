import iView from 'iview';
// import { Object } from 'core-js/library/web/timers';

export default {
  install (vue) {
    const confirm = (content, ok, cancel, options) => {
      iView.Modal.confirm(Object.assign({
        title: '提示',
        content: content,
        onOk: ok || (() => {}),
        onCancel: cancel || (() => {}),
      }, options || {}));
    };

    if (!vue.$lf) {
      vue.$lf = {
        confirm,
      };
    } else {
      vue.$lf.confirm = confirm;
    }

    vue.mixin({
      created: function () {
        this.$lf = vue.$lf;
      },
    });
  },
};
