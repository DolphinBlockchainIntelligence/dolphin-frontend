// <style>
// .getmdl-select .mdl-icon-toggle__label {
//     float:right;margin-top:-30px;color:gray
// }
// .getmdl-select.is-focused i.mdl-icon-toggle__label {
//     color:blue
// }
// .getmdl-select .mdl-menu__container {
//     width:100% !important
// }
// .getmdl-select .mdl-menu__container .mdl-menu{
//     width:100%
// }
// </style>

// <template>
//     <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label getmdl-select">

//         <input
//                 class="mdl-textfield__input"
//                 :value="selectedVal"
//                 type="text"
//                 readonly
//                 :id="domId"
//                 :name="domId"
//                 tabIndex="-1"/>
//         <label class="mdl-textfield__label" :for="domId">{{ label }}</label>

//         <ul class="mdl-menu mdl-menu--bottom-left mdl-js-menu" :for="domId">
//             <li
//                     v-for="v in values"
//                     class="mdl-menu__item"
//                     value="{{ v.key }}"
//                     @click="select(v)">
//                 {{ v.val }}
//             </li>
//         </ul>
//     </div>
// </template>

// <script>
// // mdl dont have select-support, https://github.com/google/material-design-lite/issues/854
// // so we use this workaround, feb 2016
// // based on npm package "getmdl-select"
// export default {
//     props: {
//         name: '',       // field name, used for forms
//         label: '',
//         values: [],
//         value: '',  // == selectedKey
//         selectedVal: '',
//         default: '',
//         id: '',
//     },
//     ready() {
//         for (var i = 0; i < this.values.length; i++) {
//             if (this.values[i].key == this.default) {
//                 this.value = this.values[0].key;
//                 this.selectedVal = this.values[0].val;
//             }
//         }
//     },
//     methods: {
//         select(v) {
//             this.value = v.key;
//             this.selectedVal = v.val;
//         }
//     },
//     computed: {
//         domId() {
//             if (!this.id) {
//                 this.id = 'mdls' + Math.random();
//             }
//             return this.id;
//         }
//     }
// }
// </script>
