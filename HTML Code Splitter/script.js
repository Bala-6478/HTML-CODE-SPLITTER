let currentTab = 'html';
        let splitData = {
            html: '',
            css: '',
            js: ''
        };

        function updateInputStats() {
            const text = document.getElementById('input-code').value;
            document.getElementById('input-stats').innerText = `${text.length.toLocaleString()} characters`;
        }

        function showToast(message) {
            const toast = document.getElementById('toast');
            document.getElementById('toast-message').innerText = message;
            toast.classList.add('show');
            setTimeout(() => toast.classList.remove('show'), 2500);
        }

        function switchTab(type) {
            currentTab = type;
            
            // Update UI tabs
            ['html', 'css', 'js'].forEach(t => {
                const btn = document.getElementById(`tab-${t}`);
                const pane = document.getElementById(`output-${t}`);
                if (t === type) {
                    btn.classList.add('tab-active');
                    btn.classList.remove('text-slate-500');
                    pane.classList.remove('hidden');
                } else {
                    btn.classList.remove('tab-active');
                    btn.classList.add('text-slate-500');
                    pane.classList.add('hidden');
                }
            });
        }

        function handleSplit() {
            const raw = document.getElementById('input-code').value;
            if (!raw.trim()) {
                showToast("Please enter some code first!");
                return;
            }

            try {
                const parser = new DOMParser();
                const doc = parser.parseFromString(raw, 'text/html');

                let extractedCSS = "";
                let extractedJS = "";

                // 1. Extract Styles
                const styles = doc.querySelectorAll('style');
                styles.forEach(s => {
                    extractedCSS += s.innerHTML + "\n\n";
                    s.remove();
                });

                // 2. Extract Scripts
                const scripts = doc.querySelectorAll('script');
                scripts.forEach(s => {
                    // Only extract internal scripts
                    if (!s.src) {
                        extractedJS += s.innerHTML + "\n\n";
                        s.remove();
                    }
                });

                // 3. Cleanup HTML
                // Add standard links if they aren't there
                if (extractedCSS.trim()) {
                    const link = doc.createElement('link');
                    link.rel = 'stylesheet';
                    link.href = 'style.css';
                    doc.head.appendChild(link);
                }
                if (extractedJS.trim()) {
                    const script = doc.createElement('script');
                    script.src = 'script.js';
                    doc.body.appendChild(script);
                }

                // Get final HTML string
                let finalHTML = doc.documentElement.outerHTML;
                // Simple beautify-ish (line breaks after tags)
                finalHTML = finalHTML.replace(/> </g, '>\n<');

                splitData = {
                    html: finalHTML,
                    css: extractedCSS.trim(),
                    js: extractedJS.trim()
                };

                // Update Output Panes
                document.getElementById('output-html').textContent = splitData.html;
                document.getElementById('output-css').textContent = splitData.css || "/* No internal CSS found */";
                document.getElementById('output-js').textContent = splitData.js || "// No internal JavaScript found";

                document.getElementById('empty-state').classList.add('hidden');
                showToast("Successfully split code!");

            } catch (err) {
                console.error(err);
                showToast("Error parsing HTML. Ensure it is valid.");
            }
        }

        function resetAll() {
            document.getElementById('input-code').value = '';
            document.getElementById('output-html').textContent = '';
            document.getElementById('output-css').textContent = '';
            document.getElementById('output-js').textContent = '';
            document.getElementById('empty-state').classList.remove('hidden');
            splitData = { html: '', css: '', js: '' };
            updateInputStats();
            showToast("Editor cleared");
        }

        function copyCurrent() {
            const text = splitData[currentTab];
            if (!text) {
                showToast("Nothing to copy!");
                return;
            }
            
            const textarea = document.createElement('textarea');
            textarea.value = text;
            document.body.appendChild(textarea);
            textarea.select();
            try {
                document.execCommand('copy');
                showToast(`${currentTab.toUpperCase()} copied!`);
            } catch (err) {
                showToast("Failed to copy");
            }
            document.body.removeChild(textarea);
        }

        function downloadCurrent() {
            const content = splitData[currentTab];
            if (!content) {
                showToast("Nothing to download!");
                return;
            }

            const extensions = { html: 'html', css: 'css', js: 'js' };
            const filenames = { html: 'index', css: 'style', js: 'script' };
            
            const blob = new Blob([content], { type: 'text/plain' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `${filenames[currentTab]}.${extensions[currentTab]}`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
        }