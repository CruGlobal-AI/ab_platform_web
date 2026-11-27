import ABMobileViewGridCore from "../../core/mobile/ABMobileViewGridCore";

export default class ABMobileViewGrid extends ABMobileViewGridCore {
   warningsEval() {
      super.warningsEval();

      if ((this.settings.columns || []).length == 0) {
         this.warningsMessage("has no columns selected.");
      }

      ["linkPageAdd", "linkPageDetail"].forEach((k) => {
         if (this.settings[k]) {
            let page = this.application.pageByID(this.settings[k], true);
            if (!page) {
               this.warningsMessage(`${k} references an unknown Page.`);
            }
         }
      });
   }
}
