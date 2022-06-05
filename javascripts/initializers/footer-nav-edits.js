import { withPluginApi } from "discourse/lib/plugin-api";
import { postRNWebviewMessage } from "discourse/lib/utilities";

export default {
  name: "topic-next-button-edits",

  initialize(container) {
    withPluginApi("0.8.32", function (api) {
      api.reopenWidget("footer-nav", {

          html(attrs) {
            const buttons = [];

            buttons.push(
              this.attach("flat-button", {
                action: "goBack",
                icon: "chevron-left",
                className: "btn-large",
                disabled: !attrs.canGoBack,
                title: "footer_nav.back",
              })
            );

            buttons.push(
              this.attach("flat-button", {
                action: "goForward",
                icon: "chevron-right",
                className: "btn-large",
                disabled: !attrs.canGoForward,
                title: "footer_nav.forward",
              })
            );

            if (this.capabilities.isAppWebview) {
              buttons.push(
                this.attach("flat-button", {
                  action: "share",
                  icon: "link",
                  className: "btn-large",
                  title: "footer_nav.share",
                })
              );

              buttons.push(
                this.attach("flat-button", {
                  action: "goHome",
                  icon: "home",
                  className: "btn-large",
                  title: "footer_nav.home",
                })
              );
            }

            return buttons;
          },

          goHome() {
            postRNWebviewMessage("goHome", true);
          },
      })
    })
  }
}
