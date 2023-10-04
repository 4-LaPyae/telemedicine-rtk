export const editorConfig = {
    readonly: false,
    toolbar: true,
    spellcheck: true,
    language: "en",
    toolbarButtonSize: "medium",
    showCharsCounter: true,
    showWordsCounter: true,
    showXPathInStatusbar: true,
    askBeforePasteHTML: false,
    askBeforePasteFromWord: false,
    buttons: [
        "bold",
        "italic",
        "font",
        "fontsize",
        "underline",
        "strikethrough",
        "|",
        "align",
        "indent",
        "outdent",
        "ul",
        "ol",
        "hr",
        "|",
        "image",
        "link",
        "selectAll",
        "undo",
        "redo",
    ],
    uploader: {
        insertImageAsBase64URI: true,
    },
    hidePoweredByJodit: true,
    toolbarAdaptive: false,
    useSplitMode: true,
    // width: "100%",
    width: "800px",
    minHeight: "550px",
    controls: {
        font: {
            command: "fontname",
            list: {
                "'Open Sans',sans-serif": "Open Sans",
                "Helvetica,sans-serif": "Helvetica",
                "Arial,Helvetica,sans-serif": "Arial",
                "Georgia,serif": "Georgia",
                "Impact,Charcoal,sans-serif": "Impact",
                "Tahoma,Geneva,sans-serif": "Tahoma",
                "'Times New Roman',Times,serif": "Times New Roman",
                "Verdana,Geneva,sans-serif": "Verdana",
                "Consolas,monaco,monospace": "Consolas",
            },
        },
    },
};