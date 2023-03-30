import React, { useRef } from 'react';
import tinymce from 'tinymce';
import { Editor as CKEditor } from '@tinymce/tinymce-react';

const handleFilePicker = (callback, value, meta) => {
  // Define the options for the file picker dialog
  const options = {
    title: 'Insert file',
    file_browser_callback_types: 'file',
    file_picker_callback: (cb, value, meta) => {
      // Define the options for the file picker dialog
      const fileOptions = {
        title: 'Select a file',
        button: {
          text: 'Insert file',
        },
        multiple: false,
        callback: (files) => {
          // Here you can upload the file to your server and return the URL
          const file = files[0];
          const formData = new FormData();
          formData.append('file', file);

          // You can change the URL and method to match your server API
          fetch('/api/upload', {
            method: 'POST',
            body: formData,
          })
            .then((response) => response.json())
            .then((data) => {
              const url = data.url; // The URL of the uploaded file
              cb(url);
            })
            .catch((error) => {
              console.error(error);
            });
        },
      };
      // Open the file picker dialog
      tinymce.activeEditor.windowManager.open(fileOptions);
    },
  };
  // Open the file picker dialog
  tinymce.activeEditor.windowManager.open(options);
};

const config = {
  plugins: 'file_picker',
  file_picker_types: 'file',
  file_picker_callback: handleFilePicker,
};

const demoBaseConfig = {
  width: "100%",
  height: 500,
  resize: false,
  autosave_ask_before_unload: false,
  powerpaste_allow_local_images: true,
  plugins: [
    'advlist', 'anchor', 'autolink', 'codesample', 'fullscreen', 'help',
    'image', 'tinydrive', 'lists', 'link', 'media', 'preview',
    'searchreplace', 'table', 'template', 'visualblocks', 'wordcount'
  ],
  templates: [],
  toolbar: 'insertfile undo redo | bold italic | forecolor backcolor | template codesample | alignleft aligncenter alignright alignjustify | bullist numlist | link image',
  spellchecker_dialog: true,
  spellchecker_ignore_list: ['Ephox', 'Moxiecode'],
  tinydrive_token_provider: (success, _failure) => {
    success({ token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJqb2huZG9lIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.Ks_BdfH4CWilyzLNk8S2gDARFhuxIauLa8PwhdEQhEo' });
  },
  content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:16px }',
  image_title: true,
  file_picker_types: 'image',
  file_picker_callback: function(cb, value, meta) {
    var input = document.createElement("input");
    input.setAttribute('type', 'file');
    input.setAttribute("accept", "image/*");
    input.onChange = function() {
        var file = this.files[0];

        var reader = new FileReader();
        reader.onload = function() {
            var id = 'blobid' + (new Date()).getTime();
            var blobCache = this.activeEditor.editorUpload.blobCache;
            var base64 = reader.result.split(',')[1];
            var blobInfo = blobCache.create(id, file, base64);
            blobCache.add(blobInfo);
          
            cb(blobInfo.blobUrl(), { title: file.name})
        }
        reader.readAsDataURL(file);
    }
    input.click();
  }
};

const Editor = ({ changed, initData, id }) => {
    const editorRef = useRef(null);
    const log = () => {
        if (editorRef.current) {
            changed(editorRef.current.getContent(), id);
        }
    };
    return (<>
        <CKEditor
            apiKey={process.env.REACT_APP_TINYMCE_KEY}
            onInit={(_evt, editor) => editorRef.current = editor}
            initialValue={initData}
            onChange={log}
            init={demoBaseConfig}
        />
    </>);
}

export default Editor;
