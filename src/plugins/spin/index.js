import iView from 'iview';

export default {
  install (vue) {
    const spin = {
      show: (content) => {
        iView.Spin.show({
            render: (h) => {
                return h('div', [
                    h('Icon', {
                        class: 'demo-spin-icon-load',
                        props: {
                            type: 'load-c',
                            size: 18
                        }
                    }),
                    h('div', content || 'Loading..'),
                ])
            }
        });
      },
      hide: () => {
        // $Loading && $Loading.hide();
        iView.Spin.hide();
      },
    };

    // all lf's plugins are included in this.$lf
    if (!vue.$lf) {
      vue.$lf = {
        spin,
      };
    } else {
      vue.$lf.spin = spin;
    }

    vue.mixin({
      created: function () {
        this.$lf = vue.$lf;
      },
    });
  },
};
