import {Component, OnInit, ViewChild} from '@angular/core';

@Component({
  selector: 'app-md2html',
  templateUrl: './md2html.component.html',
  styleUrls: ['./md2html.component.css']
})
export class Md2htmlComponent implements OnInit {
  @ViewChild('md2ht')
  md2ht;

  constructor() { }

  ngOnInit() {
      this.markdownToHTML('md2ht', {});
  }

    markedRenderer(markdownToC, options) {
        const defaults = {
            toc: true,           // Table of contents
            tocm: false,
            tocStartLevel: 1,              // Said from H1 to create ToC
            pageBreak: true,
            atLink: true,           // for @link
            emailLink: true,           // for mail address auto link
            taskList: false,          // Enable Github Flavored Markdown task lists
            emoji: false,          // :emoji: , Support Twemoji, fontAwesome, Editor.md logo emojis.
            tex: false,          // TeX(LaTeX), based on KaTeX
            flowChart: false,          // flowChart.js only support IE9+
            sequenceDiagram: false,          // sequenceDiagram.js only support IE9+
        };

        const settings = $.extend(defaults, options || {});
        const marked = editormd.$marked;
        const markedRenderer = new marked.Renderer();
        markdownToC = markdownToC || [];

        const regexs = editormd.regexs;
        const atLinkReg = regexs.atLink;
        const emojiReg = regexs.emoji;
        const emailReg = regexs.email;
        const emailLinkReg = regexs.emailLink;
        const twemojiReg = regexs.twemoji;
        const faIconReg = regexs.fontAwesome;
        const editormdLogoReg = regexs.editormdLogo;
        const pageBreakReg = regexs.pageBreak;

        markedRenderer.emoji = function (text) {

            text = text.replace(editormd.regexs.emojiDatetime, function ($1) {
                return $1.replace(/:/g, '&#58;');
            });

            const matchs = text.match(emojiReg);

            if (!matchs || !settings.emoji) {
                return text;
            }

            for (let i = 0, len = matchs.length; i < len; i++) {
                if (matchs[i] === ':+1:') {
                    matchs[i] = ':\\+1:';
                }

                text = text.replace(new RegExp(matchs[i]), function ($1, $2) {
                    const faMatchs = $1.match(faIconReg);
                    const name = $1.replace(/:/g, '');

                    if (faMatchs) {
                        for (let fa = 0, len1 = faMatchs.length; fa < len1; fa++) {
                            const faName = faMatchs[fa].replace(/:/g, '');

                            return '<i class="fa ' + faName + ' fa-emoji" title="' + faName.replace('fa-', '') + '"></i>';
                        }
                    } else {
                        const emdlogoMathcs = $1.match(editormdLogoReg);
                        const twemojiMatchs = $1.match(twemojiReg);

                        if (emdlogoMathcs) {
                            for (let x = 0, len2 = emdlogoMathcs.length; x < len2; x++) {
                                const logoName = emdlogoMathcs[x].replace(/:/g, '');
                                return '<i class="' + logoName + '" title="Editor.md logo (' + logoName + ')"></i>';
                            }
                        } else if (twemojiMatchs) {
                            for (let t = 0, len3 = twemojiMatchs.length; t < len3; t++) {
                                const twe = twemojiMatchs[t].replace(/:/g, '').replace('tw-', '');
                                return '<img src="' + editormd.twemoji.path + twe + editormd.twemoji.ext +
                                    '" title="twemoji-' + twe + '" alt="twemoji-' + twe + '" class="emoji twemoji" />';
                            }
                        } else {
                            let src = (name === '+1') ? 'plus1' : name;
                            src = (src === 'black_large_square') ? 'black_square' : src;
                            src = (src === 'moon') ? 'waxing_gibbous_moon' : src;

                            return '<img src="' + editormd.emoji.path + src + editormd.emoji.ext +
                                '" class="emoji" title="&#58;' + name + '&#58;" alt="&#58;' + name + '&#58;" />';
                        }
                    }
                });
            }

            return text;
        };
    }

    markdownToHTML(id, options) {
        const defaults = {
            gfm                  : true,
            toc                  : true,
            tocm                 : false,
            tocStartLevel        : 1,
            tocTitle             : '目录',
            tocDropdown          : false,
            tocContainer         : '',
            markdown             : '# hhhh',
            markdownSourceCode   : false,
            htmlDecode           : false,
            autoLoadKaTeX        : true,
            pageBreak            : true,
            atLink               : true,    // for @link
            emailLink            : true,    // for mail address auto link
            tex                  : false,
            taskList             : false,   // Github Flavored Markdown task lists
            emoji                : false,
            flowChart            : false,
            sequenceDiagram      : false,
            previewCodeHighlight : true
        };

        editormd.$marked  = marked;

        const div           = $('#' + id);
        const settings      = div.settings = $.extend(true, defaults, options || {});
        let saveTo        = div.find('textarea');

        if (saveTo.length < 1) {
            div.append('<textarea></textarea>');
            saveTo        = div.find('textarea');
        }

        let markdownDoc   = (settings.markdown === '') ? saveTo.val() : settings.markdown;
        const markdownToC   = [];

        const rendererOptions = {
            toc                  : settings.toc,
            tocm                 : settings.tocm,
            tocStartLevel        : settings.tocStartLevel,
            taskList             : settings.taskList,
            emoji                : settings.emoji,
            tex                  : settings.tex,
            pageBreak            : settings.pageBreak,
            atLink               : settings.atLink,           // for @link
            emailLink            : settings.emailLink,        // for mail address auto link
            flowChart            : settings.flowChart,
            sequenceDiagram      : settings.sequenceDiagram,
            previewCodeHighlight : settings.previewCodeHighlight,
        };

        const markedOptions = {
            renderer    : this.markedRenderer(markdownToC, rendererOptions),
            gfm         : settings.gfm,
            tables      : true,
            breaks      : true,
            pedantic    : false,
            sanitize    : (settings.htmlDecode) ? false : true, // 是否忽略HTML标签，即是否开启HTML标签解析，为了安全性，默认不开启
            smartLists  : true,
            smartypants : true
        };

        markdownDoc = new String(markdownDoc);

        let markdownParsed = marked(markdownDoc, markedOptions);

        markdownParsed = editormd.filterHTMLTags(markdownParsed, settings.htmlDecode);

        if (settings.markdownSourceCode) {
            saveTo.text(markdownDoc);
        } else {
            saveTo.remove();
        }

        div.addClass('markdown-body editormd-html-preview').append(markdownParsed);

        const tocContainer = (settings.tocContainer !== '') ? $(settings.tocContainer) : div;

        if (settings.tocContainer !== '') {
            tocContainer.attr('previewContainer', false);
        }

        // if (settings.toc) {
        //     div.tocContainer = this.markdownToCRenderer(markdownToC, tocContainer, settings.tocDropdown, settings.tocStartLevel);
        //
        //     if (settings.tocDropdown || div.find('.' + this.classPrefix + 'toc-menu').length > 0) {
        //         this.tocDropdownMenu(div, settings.tocTitle);
        //     }
        //
        //     if (settings.tocContainer !== '') {
        //         div.find('.editormd-toc-menu, .editormd-markdown-toc').remove();
        //     }
        // }

        // if (settings.previewCodeHighlight) {
        //     div.find('pre').addClass('prettyprint linenums');
        //     prettyPrint();
        // }

        if (!editormd.isIE8) {
            if (settings.flowChart) {
                div.find('.flowchart').flowChart();
            }

            if (settings.sequenceDiagram) {
                div.find('.sequence-diagram').sequenceDiagram({theme: 'simple'});
            }
        }



        div.getMarkdown = function() {
            return saveTo.val();
        };

        return div;
    }
}
