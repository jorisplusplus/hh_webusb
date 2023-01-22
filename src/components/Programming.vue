<template>
  <section id='programming'>
    <!-- <mdb-card class='mb-4' ondrop='itemDrop'>
      <mdb-card-body>
        <section>
          <mdb-row>
            <mdb-col sm='6' md='4' lg='3'>
              <mdb-btn color='gray' size='lg' title='Run fs' v-on:click='fs_ui()' icon='redo'></mdb-btn>
              <mdb-btn color='gray' size='lg' title='Make folder' v-on:click='mkdir_ui()' :disabled="mode != 1" icon='folder-plus'></mdb-btn>
              <mdb-btn color='gray' size='lg' title='Download folder' v-on:click='download_ui()' :disabled="mode != 1" icon='download'></mdb-btn>
              <mdb-btn color='gray' size='lg' title='Make file' v-on:click='mkfile_ui()' :disabled="mode != 1" icon='file'></mdb-btn>
              <mdb-btn color='gray' size='lg' title='Rename file' v-on:click='rename_ui()' :disabled="mode != 1" icon='file-alt'></mdb-btn>
              <mdb-btn color='gray' size='lg' title='Delete file' v-on:click='trash_ui()' :disabled="mode != 1" icon='trash'></mdb-btn>              
            </mdb-col>
            <mdb-col sm='2' md='2' lg='2'>
              <mdb-btn color='gray' size='lg' title='Run file' v-on:click='runfile_ui()' :disabled="mode != 1" icon='play'></mdb-btn>
              
              <mdb-btn color='gray' size='lg' title='Save file' v-on:click='save_ui()' :disabled="mode != 1" icon='save'></mdb-btn>
            </mdb-col>
            <mdb-col sm='4' md='6' lg='7' class="mt-2">
              <mdb-input label="Filename" v-model="editorfilename" :disabled="mode != 1" size="md"/>
            </mdb-col>
          </mdb-row>
          <mdb-row class='mt-3'>
            <mdb-col sm='6' md='4' lg='3'>
              <v-jstree :data='files' draggable multiple allow-batch whole-row @item-click='itemClick' @item-toggle='itemToggle' @item-drop-before='itemDrop' @item-drop='otherDrop' @item-drag-start='itemDragStart'></v-jstree>
            </mdb-col>
            <mdb-col sm='6' md='8' lg='9'>
              <editor v-model='content_editor' :setReadOnly="mode != 1" lang='python' theme='monokai' height='500' ref='pythoneditor'></editor>
            </mdb-col>
          </mdb-row>
          </section>
      </mdb-card-body>
    </mdb-card> -->
      <mdb-card class='mb-4'>
      <mdb-card-body>
        <section>
              Python terminal
              <mdb-btn color='gray' size='lg' title='Run fs' v-on:click='repl_ui()' icon='play'></mdb-btn>
              <div class="md-form">
                  <Terminal ref="terminal" v-on:data="commandpython" :disabled="mode == 1"></Terminal>
              </div>
        </section>
      </mdb-card-body>
    </mdb-card>
  </section>
</template>

<script>
window.itemDrop = function() {
  console.log('nope')
};

import {mdbToastNotification, mdbBtn, mdbCard, mdbCardBody, mdbCol, mdbRow, mdbInput} from 'mdbvue';
import VJstree from 'vue-jstree';
  import {connect, on_connect, writetostdin, registerstdout} from '../webserial';
import * as $ from 'jquery';
import * as ace from 'brace';
import 'brace/mode/python';
import 'brace/theme/monokai';
import * as ace_editor from 'vue2-ace-editor';
import { saveAs } from 'file-saver';
import * as JSZip from 'jszip';
import { default as Terminal } from './Terminal'

let component = undefined;
let selected_item = {model:{}};
let beforemoveloc = undefined;


const extension_whitelist = ["txt", "csv", "json", "py", "ini", "info", "md", "log", "conf", "cfg"];

function commandlog(str) {
  if(component && component.$refs && component.$refs.terminal) {
    component.$refs.terminal.handleLog(str);
  }
}

export default {
  name: 'Programming',
  components: {
    mdbBtn,
    //mdbRow,
    //mdbCol,
    mdbCard,
    mdbCardBody,
    //mdbInput,
    //VJstree,
    //editor:ace_editor,
    Terminal,
  },
  beforeMount() {
    component = this;
    // Auto-fetch /flash
    registerstdout(commandlog);
  },
  watch: {
    mode: function (val) {
      let editor = this.$refs.pythoneditor.editor;
      editor.setReadOnly(val != 1);
    }
  },
  methods: {
    repl_ui: async () => {
      component.mode=0;
    },
    info() {

    },
    commandpython(e) {
      writetostdin(e);
    },
    connect:connect,
  },
  data () {
    return {
      mode:0,
    }
  }
}

</script>

<style scoped>
  .profile-card-footer {
    background-color: #F7F7F7 !important;
    padding: 1.25rem;
  }
  .card.card-cascade .view {
    box-shadow: 0 3px 10px 0 rgba(0, 0, 0, 0.15), 0 3px 12px 0 rgba(0, 0, 0, 0.15);
  }
  .btn.btn-lg {
    padding: .5rem .5rem !important;
  }
  .md-form {
   margin: 0 0 0 0;
  }
  input .input-lg {
    padding-top: 0 !important;
    padding-bottom: 0 !important;
  }
  textarea {
    width:100%;
    height:400px;
  }
</style>

<style>
  .md-form .form-control {
    margin-bottom: 0;
  }
  .tree-selected {
    background: #eee !important;
  }
</style>
