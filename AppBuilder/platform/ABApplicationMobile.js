import _ from "lodash";

// prettier-ignore
import ABApplicationMobileCore from "../core/ABApplicationMobileCore.js";

import ABViewPageMobile from "./mobile/ABMobilePage";

export default class ABClassApplicationMobile extends ABApplicationMobileCore {
   constructor(attributes, AB) {
      super(attributes, AB);
   }

   ///
   /// Definition
   ///

   /**
    * @method pageNew()
    * return a new instance of an ABViewPageMobile
    * @param values
    *        The initial settings for the page.
    * @return {ABViewPageMobile}
    */
   pageNew(values) {
      const newPage = new ABViewPageMobile(values, this);
      newPage.parent = this;
      return newPage;
   }

   /**
    * @method viewAll()
    * Return only the mobile view classes. The web ABApplication.viewAll()
    * also adds the plugin views from ClassManager (grid, chart, kanban...),
    * which are web widgets. Without this override they show up in the PWA
    * "add widget" list and get saved onto mobile pages (eg key "grid").
    * @param {fn} fn  filter
    * @return {array}
    */
   viewAll(fn = () => true) {
      return this.ViewManager.allViews(fn);
   }

   async setPageDefault(page) {
      if (this.pageDefault != page.id) {
         let oldPage = this.pageByID(this.pageDefault, true);
         if (oldPage) {
            oldPage.defaultPage = 0;
            await oldPage.save();
         }

         this.pageDefault = page.id;
         await this.save();
      }
   }
}
