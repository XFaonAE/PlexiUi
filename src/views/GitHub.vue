<template>
    <div class="_view">
        <MarkDown>
            <p><a href="https://electronjs.org"><img src="https://electronjs.org/images/electron-logo.svg" alt="Electron Logo"></a></p>
<p><a href="https://circleci.com/gh/electron/electron/tree/master"><img src="https://circleci.com/gh/electron/electron/tree/master.svg?style=shield" alt="CircleCI Build Status"></a>
<a href="https://ci.appveyor.com/project/electron-bot/electron-ljo26/branch/master"><img src="https://ci.appveyor.com/api/projects/status/4lggi9dpjc1qob7k/branch/master?svg=true" alt="AppVeyor Build Status"></a>
<a href="https://discord.com/invite/electron"><img src="https://img.shields.io/discord/745037351163527189?color=%237289DA&amp;label=chat&amp;logo=discord&amp;logoColor=white" alt="Electron Discord Invite"></a></p>
<p>:memo: Available Translations: 🇨🇳 🇧🇷 🇪🇸 🇯🇵 🇷🇺 🇫🇷 🇺🇸 🇩🇪.
View these docs in other languages at <a href="https://github.com/electron/i18n/tree/master/content/">electron/i18n</a>.</p>
<p>The Electron framework lets you write cross-platform desktop applications
using JavaScript, HTML and CSS. It is based on <a href="https://nodejs.org/">Node.js</a> and
<a href="https://www.chromium.org">Chromium</a> and is used by the <a href="https://github.com/atom/atom">Atom
editor</a> and many other <a href="https://electronjs.org/apps">apps</a>.</p>
<p>Follow <a href="https://twitter.com/electronjs">@ElectronJS</a> on Twitter for important
announcements.</p>
<p>This project adheres to the Contributor Covenant
<a href="https://github.com/electron/electron/tree/master/CODE_OF_CONDUCT.md">code of conduct</a>.
By participating, you are expected to uphold this code. Please report unacceptable
behavior to <a href="mailto:coc@electronjs.org">coc@electronjs.org</a>.</p>
<h2 id="installation">Installation</h2>
<p>To install prebuilt Electron binaries, use <a href="https://docs.npmjs.com/"><code>npm</code></a>.
The preferred method is to install Electron as a development dependency in your
app:</p>
<pre><code class="lang-sh">npm install electron --<span class="hljs-built_in">save</span>-<span class="hljs-built_in">dev</span>
</code></pre>
<p>For more installation options and troubleshooting tips, see
<a href="docs/tutorial/installation.md">installation</a>. For info on how to manage Electron versions in your apps, see
<a href="docs/tutorial/electron-versioning.md">Electron versioning</a>.</p>
<h2 id="quick-start-electron-fiddle">Quick start &amp; Electron Fiddle</h2>
<p>Use <a href="https://github.com/electron/fiddle"><code>Electron Fiddle</code></a>
to build, run, and package small Electron experiments, to see code examples for all of Electron&#39;s APIs, and
to try out different versions of Electron. It&#39;s designed to make the start of your journey with
Electron easier.</p>
<p>Alternatively, clone and run the
<a href="https://github.com/electron/electron-quick-start">electron/electron-quick-start</a>
repository to see a minimal Electron app in action:</p>
<pre><code class="lang-sh">git <span class="hljs-keyword">clone</span> <span class="hljs-title">https</span>://github.com/electron/electron-quick-<span class="hljs-literal">start</span>
cd electron-quick-<span class="hljs-literal">start</span>
npm install
npm <span class="hljs-literal">start</span>
</code></pre>
<h2 id="resources-for-learning-electron">Resources for learning Electron</h2>
<ul>
<li><a href="https://electronjs.org/docs">electronjs.org/docs</a> - All of Electron&#39;s documentation</li>
<li><a href="https://github.com/electron/fiddle">electron/fiddle</a> - A tool to build, run, and package small Electron experiments</li>
<li><a href="https://github.com/electron/electron-quick-start">electron/electron-quick-start</a> - A very basic starter Electron app</li>
<li><a href="https://electronjs.org/community#boilerplates">electronjs.org/community#boilerplates</a> - Sample starter apps created by the community</li>
<li><a href="https://github.com/electron/simple-samples">electron/simple-samples</a> - Small applications with ideas for taking them further</li>
<li><a href="https://github.com/electron/electron-api-demos">electron/electron-api-demos</a> - An Electron app that teaches you how to use Electron</li>
<li><a href="https://github.com/hokein/electron-sample-apps">hokein/electron-sample-apps</a> - Small demo apps for the various Electron APIs</li>
</ul>
<h2 id="programmatic-usage">Programmatic usage</h2>
<p>Most people use Electron from the command line, but if you require <code>electron</code> inside
your <strong>Node app</strong> (not your Electron app) it will return the file path to the
binary. Use this to spawn Electron from Node scripts:</p>
<pre><code class="lang-javascript"><span class="hljs-keyword">const</span> electron = <span class="hljs-built_in">require</span>(<span class="hljs-string">'electron'</span>)
<span class="hljs-keyword">const</span> proc = <span class="hljs-built_in">require</span>(<span class="hljs-string">'child_process'</span>)

<span class="hljs-comment">// will print something similar to /Users/maf/.../Electron</span>
<span class="hljs-built_in">console</span>.log(electron)

<span class="hljs-comment">// spawn Electron</span>
<span class="hljs-keyword">const</span> child = proc.spawn(electron)
</code></pre>
<h3 id="mirrors">Mirrors</h3>
<ul>
<li><a href="https://npm.taobao.org/mirrors/electron">China</a></li>
</ul>
<h2 id="documentation-translations">Documentation Translations</h2>
<p>Find documentation translations in <a href="https://github.com/electron/i18n">electron/i18n</a>.</p>
<h2 id="contributing">Contributing</h2>
<p>If you are interested in reporting/fixing issues and contributing directly to the code base, please see <a href="CONTRIBUTING.md">CONTRIBUTING.md</a> for more information on what we&#39;re looking for and how to get started.</p>
<h2 id="community">Community</h2>
<p>Info on reporting bugs, getting help, finding third-party tools and sample apps,
and more can be found in the <a href="docs/tutorial/support.md#finding-support">support document</a>.</p>
<h2 id="license">License</h2>
<p><a href="https://github.com/electron/electron/blob/master/LICENSE">MIT</a></p>
<p>When using the Electron or other GitHub logos, be sure to follow the <a href="https://github.com/logos">GitHub logo guidelines</a>.</p>

        </MarkDown>
    </div>
</template>

<script>
import MarkDown from "../components/ux/MarkDown";

export default {
    components: {
        MarkDown
    }
}
</script>

<style lang="less" scoped>
@import "../components/Config";

._view {
    padding: 10px 20px;
}
</style>