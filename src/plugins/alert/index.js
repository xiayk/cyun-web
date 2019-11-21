import iView from 'iview';
// import { Object } from 'core-js/library/web/timers';

export default {
  install (vue) {
    const Alert = {
      error: (content, title, cb, options) => {
        iView.Modal.error(Object.assign({
          onOk: cb || (() => {}),
          title: title || '错误',
          content: content,
        }, options || {}));
      },
      info: (content, title, cb, options) => {
        iView.Modal.info(Object.assign({
          onOk: cb || (() => {}),
          title: title || '提示',
          content: content,
        }, options || {}));
      },
      success: (content, title, cb, options) => {
        iView.Modal.success(Object.assign({
          onOk: cb || (() => {}),
          title: title || '提示',
          content: content,
        }, options || {}));
      },
      warning: (content, title, cb, options) => {
        iView.Modal.warning(Object.assign({
          onOk: cb || (() => {}),
          title: title || '提醒',
          content: content,
        }, options || {}));
      },
    };

    if (!vue.$lf) {
      vue.$lf = {
        alert: Alert,
      };
    } else {
      vue.$lf.alert = Alert;
    }

    vue.mixin({
      created: function () {
        this.$lf = vue.$lf;
      },
    });
  },
};
