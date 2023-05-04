import ClassicEditor from '@ckeditor/ckeditor5-editor-classic/src/classiceditor';
import Autoformat from '@ckeditor/ckeditor5-autoformat/src/autoformat';
import Bold from '@ckeditor/ckeditor5-basic-styles/src/bold';
import CKFinder from '@ckeditor/ckeditor5-ckfinder/src/ckfinder';
import CKFinderUploadAdapter from '@ckeditor/ckeditor5-adapter-ckfinder/src/uploadadapter';
import CloudServices from '@ckeditor/ckeditor5-cloud-services/src/cloudservices';
import EasyImage from '@ckeditor/ckeditor5-easy-image/src/easyimage';
import Essentials from '@ckeditor/ckeditor5-essentials/src/essentials';
import FindAndReplace from '@ckeditor/ckeditor5-find-and-replace/src/findandreplace';
import FontColor from '@ckeditor/ckeditor5-font/src/fontcolor';
import FontFamily from '@ckeditor/ckeditor5-font/src/fontfamily';
import FontSize from '@ckeditor/ckeditor5-font/src/fontsize';
import FontBackgroundColor from '@ckeditor/ckeditor5-font/src/fontbackgroundcolor';
import Heading from '@ckeditor/ckeditor5-heading/src/heading';
import Image from '@ckeditor/ckeditor5-image/src/image';
import ImageCaption from '@ckeditor/ckeditor5-image/src/imagecaption';
import ImageStyle from '@ckeditor/ckeditor5-image/src/imagestyle';
import ImageToolbar from '@ckeditor/ckeditor5-image/src/imagetoolbar';
import ImageUpload from '@ckeditor/ckeditor5-image/src/imageupload';
import Indent from '@ckeditor/ckeditor5-indent/src/indent';
import Italic from '@ckeditor/ckeditor5-basic-styles/src/italic';
import Link from '@ckeditor/ckeditor5-link/src/link';
import List from '@ckeditor/ckeditor5-list/src/list';
import MediaEmbed from '@ckeditor/ckeditor5-media-embed/src/mediaembed';
import Paragraph from '@ckeditor/ckeditor5-paragraph/src/paragraph';
import PasteFromOffice from '@ckeditor/ckeditor5-paste-from-office/src/pastefromoffice';
import SpecialCharacters from '@ckeditor/ckeditor5-special-characters/src/specialcharacters';
import SourceEditing from '@ckeditor/ckeditor5-source-editing/src/sourceediting';
import Strikethrough from '@ckeditor/ckeditor5-basic-styles/src/strikethrough';
import Style from '@ckeditor/ckeditor5-style/src/style';
import Subscript from '@ckeditor/ckeditor5-basic-styles/src/subscript';
import Superscript from '@ckeditor/ckeditor5-basic-styles/src/superscript';
import Table from '@ckeditor/ckeditor5-table/src/table';
import TableToolbar from '@ckeditor/ckeditor5-table/src/tabletoolbar';
import TextPartLanguage from '@ckeditor/ckeditor5-language/src/textpartlanguage';
import TextTransformation from '@ckeditor/ckeditor5-typing/src/texttransformation';
import Title from '@ckeditor/ckeditor5-heading/src/title';
import GeneralHtmlSupport from '@ckeditor/ckeditor5-html-support/src/generalhtmlsupport';

class EditorConfig extends ClassicEditor {}

// Plugins to include in the build.
EditorConfig.builtinPlugins = [
	Essentials,
	CKFinderUploadAdapter,
	Autoformat,
	Bold,
	Italic,
	CKFinder,
	CloudServices,
	EasyImage,
	FontFamily,
	FontColor,
	FontSize,
	FontBackgroundColor,
	FindAndReplace,
	Heading,
	GeneralHtmlSupport,
	Image,
	ImageCaption,
	ImageStyle,
	ImageToolbar,
	ImageUpload,
	Indent,
	Link,
	List, 
	MediaEmbed,
	Paragraph,
	PasteFromOffice,
	SpecialCharacters,
	SourceEditing,
	Strikethrough,
	Style,
	Subscript,
	Superscript,
	Table,
	TableToolbar,
	TextPartLanguage,
	TextTransformation,
	Title
];

// Editor configuration.
EditorConfig.defaultConfig = {
	toolbar: {
		items: [
			'heading', '|',
			'bold', 'italic', 'link', 'bulletedList', 'numberedList', '|',
			'outdent', 'indent', '|',
			'imageUpload',
			'insertTable',
			'undo',
			'redo',
			'strikethrough',
			'style',
			'subscript',
			'superscript',
			'textPartLanguage',
			'CKFinder',
			'findAndReplace',
			'fontBackgroundColor',
			'fontColor',
			'fontFamily',
			'fontSize',
			'sourceEditing'
		]
	},
	language: 'en',
	image: {
		toolbar: [
			'imageStyle:full',
			'imageStyle:side',
			'|',
			'imageTextAlternative'
		]
	},
	table: {
		contentToolbar: [
			'tableColumn',
			'tableRow',
			'mergeTableCells'
		]
	}
};

export default EditorConfig;