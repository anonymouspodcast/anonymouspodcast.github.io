// lrc (String) - lrc file text
function parseLyric(lrc) {
    const regex = /^\[(?<time>\d{2}:\d{2}(.\d{2})?)\](?<text>.*)/;

    // split lrc string to individual lines
    const lines = lrc.split("\n");

    const output = [];

    lines.forEach(line => {
        line = line.trim();
        const match = line.match(regex);

        // if doesn't match, return.
        if (match == null) return;

        const { time, text } = match.groups;

        output.push({
            time: parseTime(time),
            text: text.trim()
        });
    });

    // parse formated time
    // "03:24.73" => 204.73 (total time in seconds)
    function parseTime(time) {
        const minsec = time.split(":");

        const min = parseInt(minsec[0]) * 60;
        const sec = parseFloat(minsec[1]);

        return min + sec;
    }

    return output;
}

// lyrics (Array) - output from parseLyric function
// time (Number) - current time from audio player
function syncLyric(lyrics, time) {
    const scores = [];

    lyrics.forEach(lyric => {
        // get the gap or distance or we call it score
        const score = time - lyric.time;

        // only accept score with positive values
        if (score >= 0) scores.push(score);
    });

    if (scores.length == 0) return null;

    // get the smallest value from scores
    const closest = Math.min(...scores);

    // return the index of closest lyric
    return scores.indexOf(closest);
}

window.onload = function main() {
    "use strict";   

    const dom = {
        lyric1: document.querySelector(".lyric1"),
        player1: document.querySelector(".player1"),
        lyric2: document.querySelector(".lyric2"),
        player2: document.querySelector(".player2"),
        lyric3: document.querySelector(".lyric3"),
        player3: document.querySelector(".player3"),
        lyric4: document.querySelector(".lyric4"),
        player4: document.querySelector(".player4"),
        lyric5: document.querySelector(".lyric5"),
        player5: document.querySelector(".player5"),
        lyric6: document.querySelector(".lyric6"),
        player6: document.querySelector(".player6"),
        lyric7: document.querySelector(".lyric7"),
        player7: document.querySelector(".player7"),
    };
    const lrc1 = `
    [00:00.00]1: 那个行， 然后那个我觉得是那个说一下这个3:3这场比赛 好吧，嗯，我3:3。
    [00:07.41]2: 哈哥也没有贡献我对。
    [00:09.09]1: 其实对面那个维尼修斯除了那两个助攻以外啊，但是我我觉着就是维尼修斯产品赛也没什么，也挺引申的， 然后我们再说那个巴黎切尔曼那场比赛我觉得穆巴派也挺谨慎的，就是，其实目前就是我们新生代就这几个就是说啥名来的对吧， 那个贝利厄姆啊，维尼修斯， 这个什么哈兰德姆巴佩，就感觉在这一轮都没有说拿出当年什么梅梅罗那样的表现，
    [00:35.48]2: 还有哈弗茨对，哈弗茨也是。
    [00:37.38]1: 什么玩意 也是。
    [00:38.42]2: 哈也也是我感觉哈布斯对也是哦，还是对差一点跟这种梅罗独一档，
    [00:45.39]1: 哈布斯独一档啊，他已经独一超脱于过誉梅罗的过誉了，过誉？ 没个过誉不需要哈佛都不需要跟那个梅罗比了。 它属于说是什么呀？ 是属于说那个乒乓球发明正手那个长长那个什么，不不不，是不不不，叫乒乓球啊，反正那个反正这么一个人，然后发明了一项特别技术的人。
    [01:08.12]2: 啊。不是我说一下这个，这个话你留到这个阿萨拿了这个欧冠冠军，他成为拿了坐拥两个欧冠冠军的这个球员，我觉得他才可以并肩一下梅罗。我我是这意思，你到时候再说行吧，是不是？
    [01:20.32]1: 但正好你说到这个哈姆斯了，我觉得那个张璐知道就是这上，前一天在那个节目里说说这个哈兰德对吧？你其实就应该学这个哈弗斯啊，你就哈弗斯怎么踢，你就是专门让对面难受对不对， 你就搁前面站着，你就跟人家那个前锋中对外中空位不行身体不行你跟人顶啊， 对面那个怎么着，你就撤回来啊，防守撞怎么着，反正你就你就是怎么让怎么让，对方难受你怎么来 对不对， 这样你在那个你在曼城你就是进不了球，你也有用， 而且你建议这样这这么踢了，像哈姆斯一样，我觉得他也比哈姆斯 也不一定啊，反正就是有用点，比现在你怎么我觉得做不到。
    [02:05.21]2: 不是这个这个最最直接的影响是什么？ 你性格不行， 哈弗斯是那种我贱兮兮挑衅完别人之后或者我跟你在那肉搏对吧？我无所谓我拿黄牌我馋你对吧？ 但他们都会跟人吵架好几次对吧？在英超联赛 都直接跟人吵架。 对，我觉得这个汉字还是皮有点爆，就是就他在被呃怎么说，被对方后卫所挑衅，他不能去做那个挑衅别人的人，就是我觉得这个这个就就可能说年轻气盛，心高气傲我我相信姆巴佩肯定也做不成哈弗斯这样的事情， 因为他不是从小到大都是天之骄子啊，对吧？谁会觉得大家都觉得你是什么下一个天王，下一个天后是定位不一样，就就等于说你你让一个那个皇帝的儿子去去去扛砖头对吧？我觉得哈泽可以扛啊，他是驴， 但是哈伦德不行，穆巴佩不行。
    [02:55.71]1: 嗯，那这个还是说白了还是那个 觉悟不行， 你要从工人中来，回到工人中去， 你有这觉悟才行，   
    `
    const lyrics1 = parseLyric(lrc1);
    dom.lyric1.innerHTML = lyrics1[0].text;
    dom.player1.ontimeupdate = () => {
        const time = dom.player1.currentTime;
        const index = syncLyric(lyrics1, time);

        if (index == null) return;
        dom.lyric1.innerHTML = lyrics1[index].text;
    }    

    const lrc2 = `
    [00:00.00]1: 那个行， 然后那个我觉得是那个说一下这个3:3这场比赛 好吧，嗯，我3:3。
    [00:06.55]2: 哈哥也没有贡献我对。
    [00:08.20]1: 其实对面那个维尼修斯除了那两个助攻以外啊，但是我我觉着就是维尼修斯产品赛也没什么，也挺引申的， 然后我们再说那个巴黎切尔曼那场比赛我觉得穆巴派也挺谨慎的，就是，其实目前就是我们新生代就这几个就是说啥名来的对吧， 那个贝利厄姆啊，维尼修斯， 这个什么哈兰德姆巴佩，就感觉在这一轮都没有说拿出当年什么梅梅罗那样的表现，
    [00:31.79]2: 还有哈弗茨对，哈弗茨也是。
    [00:33.94]1: 什么玩意 也是。
    [00:34.91]2: 哈也也是我感觉哈布斯对也是哦，还是对差一点跟这种梅罗独一档，
    [00:39.63]1: 哈布斯独一档啊，他已经独一超脱于过誉梅罗的过誉了，过誉？ 没个过誉不需要哈佛都不需要跟那个梅罗比了。 它属于说是什么呀？ 是属于说那个乒乓球发明正手那个长长那个什么，不不不，是不不不，叫乒乓球啊，反正那个反正这么一个人，然后发明了一项特别技术的人。
    [00:56.80]2: 啊。不是我说一下这个，这个话你留到这个阿萨拿了这个欧冠冠军，他成为拿了坐拥两个欧冠冠军的这个球员，我觉得他才可以并肩一下梅罗。我我是这意思，你到时候再说行吧，是不是？
    [01:08.65]1: 但正好你说到这个哈姆斯了，我觉得那个张璐知道就是这上，前一天在那个节目里说说这个哈兰德对吧？你其实就应该学这个哈弗斯啊，你就哈弗斯怎么踢，你就是专门让对面难受对不对， 你就搁前面站着，你就跟人家那个前锋中对外中空位不行身体不行你跟人顶啊， 对面那个怎么着，你就撤回来啊，防守撞怎么着，反正你就你就是怎么让怎么让，对方难受你怎么来 对不对， 这样你在那个你在曼城你就是进不了球，你也有用， 而且你建议这样这这么踢了，像哈姆斯一样，我觉得他也比哈姆斯 也不一定啊，反正就是有用点，比现在你怎么我觉得做不到。
    [01:44.50]2: 不是这个这个最最直接的影响是什么？ 你性格不行， 哈弗斯是那种我贱兮兮挑衅完别人之后或者我跟你 在那肉搏对吧？我无所谓我拿黄牌我馋你对吧？ 但他们都会跟人吵架好几次对吧？在英超联赛 都直接跟人吵架。 对，我觉得这个汉字还是皮有点爆，就是就他在被呃怎么说，被对方后卫所挑衅，他不能去做那个挑衅别人的人，就是我觉得这个这个就就可能说年轻气盛，心高气傲我我相信姆巴佩肯定也做不成哈弗斯这样的事情， 因为他不是从小到大都是天之骄子啊，对吧？谁会觉得大家都觉得你是什么下一个天王，下一个天后是定位不一样，就就等于说你你让一个那个皇帝的儿子去去去扛砖头对吧？我觉得哈泽可以扛啊，他是驴， 但是哈伦德不行，穆巴佩不行。
    [02:32.79]1: 嗯，那这个还是说白了还是那个 觉悟不行， 你要从工人中来，回到工人中去， 你有这觉悟才行，   
    `
    const lyrics2 = parseLyric(lrc2);
    dom.lyric2.innerHTML = lyrics2[0].text;
    dom.player2.ontimeupdate = () => {
        const time = dom.player2.currentTime;
        const index = syncLyric(lyrics2, time);

        if (index == null) return;
        dom.lyric2.innerHTML = lyrics2[index].text;
    }   
    
    const lrc3 = `
    [00:00.00]1: 我觉得应该谈一下3:3这场比赛。
    [00:02.63]2: 哈哥这场没有贡献。
    [00:04.25]1: 维尼修斯除了两次助攻，其实表现不明显。再谈巴黎圣日耳曼那场，穆巴佩也比较谨慎。目前新生代选手，如贝林厄姆、维尼修斯、哈兰德、姆巴佩，都未能表现出梅罗巅峰时的水平。
    [00:17.35]2: 还有哈弗茨，也是差一点。
    [00:19.11]1: 对，他还没有达到梅罗的水平。
    [00:21.06]2: 我觉得哈弗茨的能力还不够梅罗那样的独一档。
    [00:24.12]1: 哈弗茨的评价已经超越梅罗的过誉程度。他好像是那些发明特别技术的运动员。
    [00:30.00]2: 我认为如果哈弗茨能拿到阿森纳的欧冠冠军，他才能和梅罗并肩。
    [00:34.52]1: 正好说到哈弗茨，我想起张璐以前说过的。哈兰德需要学习哈弗茨的踢法，要懂得对抗，用身体让对手不舒服，即便不进球也能有价值。
    [00:45.35]2: 关键是性格问题。哈弗茨是那种敢于挑衅犯规的球员，而姆巴佩和哈兰德可能做不到这一点，因为他们一直是天之骄子，不习惯这样的角色转换。
    [00:55.57]1: 说到底还是觉悟的问题，需要有从工人中来、回到工人中去的觉悟。  
    `
    const lyrics3 = parseLyric(lrc3);
    dom.lyric3.innerHTML = lyrics3[0].text;
    dom.player3.ontimeupdate = () => {
        const time = dom.player3.currentTime;
        const index = syncLyric(lyrics3, time);

        if (index == null) return;
        dom.lyric3.innerHTML = lyrics3[index].text;
    }
    

    const lrc4 = `
    [00:00.00]1: 我觉得应该说一下三三这个比赛
    [00:02.22]2: 哈哥这场没贡献，
    [00:03.67]1: 维尼修斯也没贡献。其实维尼修斯除了两次助攻，其实你仔细看这整场比赛他表现的其实也没有那么明显，嗯， 再说巴黎圣日耳曼那场，穆巴佩也没有贡献。 就是，其实你看现在这新生代选手， 嗯，包括什么贝林厄姆，维尼修斯，哈兰德，姆巴佩，其实都没有到梅罗巅峰的那种水平，
    [00:21.62]2: 还有哈弗茨， 哈弗茨也是差一点。
    [00:24.01]1: 对，他其实还没有到梅罗那种水平。
    [00:26.15]2: 我我，我觉得哈弗茨是这样的， 他的能力还没有到梅罗那一步， 他还没有达到， 他还没有达到那种， 就是说那种独一档的那种水平。
    [00:34.50]1: 其实哈弗茨已经超越了梅罗， 梅罗的那种过誉的程度， 就是说他就是那种， 就是那些发明那种特别技术的那种运动员。
    [00:43.14]2: 对，我觉得哈弗茨要是能拿到一个阿森纳的欧冠冠军，他才能和梅罗并肩，
    [00:47.85]1: 哈哈， 那正好说哈弗茨，我想到就是张璐以前说过， 就是哈兰德， 他要学哈弗茨的踢法， 就是说你，你要懂得对抗， 你要懂得用你的身体去让对手不舒服， 即使你不进球， 你也能有他的价值。
    [01:01.68]2: 我觉得是这样，就是说他性格问题， 哈弗茨是那种敢于挑衅犯规的球员， 但是姆巴佩和哈兰德可能做不到这一点， 就是他们一直都是那种天之骄子， 他们可能不太习惯这样的角色转换，
    [01:14.30]1: 说白了还是觉悟的问题， 他需要有那种从工人中来，回到工人中去的那种觉悟。   
    `
    const lyrics4 = parseLyric(lrc4);
    dom.lyric4.innerHTML = lyrics4[0].text;
    dom.player4.ontimeupdate = () => {
        const time = dom.player4.currentTime;
        const index = syncLyric(lyrics4, time);

        if (index == null) return;
        dom.lyric4.innerHTML = lyrics4[index].text;
    }

    const lrc5 = `
    [00:00.00]1: 嗯，那今天我们来聊聊一个很重要的话题， 那就是约翰纳什的非合作博弈，
    [00:05.46]2: 没错， 这篇论文可以说奠定了现代博弈论的整个基础。
    [00:09.78]1: 是的， 纳什在论文当中提出了非合作博弈理论， 呃，就是研究多于两人且无法达成共识的多方参与者之间的决策问题。
    [00:19.51]2: 那听着就是我们日常生活的很多挑战嘛， 没有合作没有沟通，完全就是自我决策。
    [00:25.28]1: 嗯，那纳什呢，是将合作博弈的理论进行了对比， 就像合作博弈的代表人物冯诺伊曼和摩根斯坦提出理论， 他们假设玩家之间是可以沟通的，可以进行信息交流的。 而纳什呢， 他就假设参与的人之间是没有沟通的， 每个人都是独立行动的。
    [00:43.86]2: 那这样听上去就是孤独的啊， 但这样看起来也很真实啊。
    [00:47.26]1: 是的， 那这个论文的中心思想就是均衡点， 就是在这样的状态下， 每个参与者都没有办法通过改变自己的策略而获得更大的收益，
    [00:57.11]2: 也就是每个人的选择都是对其他人的策略都是最优的对吧？
    [01:01.17]1: 没错，你听得可真透啊。 那这就是说在每个参与者的策略都是固定的， 在这样的情况下，每个人都是最大化其收益，
    [01:09.72]2: 那混合策略指的是什么呢？
    [01:11.45]1: 混合策略就是每个参与者都是以一定的概率去随机选择不同的纯策略， 而不是一直坚持同一个策略。   
    [01:20.00]2: 哦，那这个就比较好理解，呃，就像我们在玩扑克牌， 那那么我们在选择策略的时候也要变化才对。
    [01:26.65]1: 没错。 然后还有一个重要的点就是有限博弈， 就是纳什的理论是主要适用于有限博弈的， 也就是参与的玩家是有限的， 玩家策略也是有限的。
    [01:37.65]2: 这在现实世界中就很实用啊，特别是一些商业竞争啊，
    [01:41.32]1: 那我们再来看看非合作博弈纳什均衡点证明。 纳什证明了每一个有限的非合作博弈至少会有一个均衡点， 那么这个定理的建立是建立在布劳威尔不动点定理之上。
    [01:54.34]2: 这个布劳威尔不动点定理听上去就有点复杂，就像是一门数学魔法，
    [01:59.32]1: 那还是有点复杂， 那纳什也在讨论对称博弈， 就是指参与的博弈双方和各自的策略是可以相互互换的， 但游戏结构是不变的。
    [02:09.78]2: 诶，这样听起来就感觉博弈就像一面镜子， 就是对称和平等的。
    [02:14.75]1: 没错， 那他呢，就在讨论了对称博弈之后，证明了对称博弈至少会有一个对称均衡点，
    [02:21.67]2: 那这个呢，应该是对于我们理解博弈的一种新的思维方式吧。
    [02:25.87]1: 嗯，那再来看看可解性， 那纳什定义了一个可解博弈和可解博弈的均衡点的集合， 如果互换性条件成立， 那么可解博弈的均衡点的集合呢，就是可解博弈的解，
    [02:39.56]2: 那这个听起来就是一种理想的平衡方案？
    [02:42.30]1: 没错， 那他还定义了一个均衡策略集， 就是每个参与者的均衡策略集呢，呃，就是某些均衡点中使用的策略集， 那么这个均衡策略集呢，就是在这个博弈中的可解策略集。
    [02:55.41]2: 呃，这个均衡策略集是什么样的呢？
    [02:57.88]1: 那在可解博弈中， 每个参与者的均衡策略集呢，都是其混合策略空间的一个凸多面体子集。
    [03:05.69]2: 哦，那这个听起来就是让博弈论的数学性质变得非常明确啊。
    [03:10.27]1: 没错。 那纳什还在讨论了策略的支配， 就是一个策略，如果始终优于另一个策略， 不管是其他策略怎么样， 那它就是一个支配策略。 那在每一个均衡点呢，是不可能包含任何被支配策略的。
    [03:25.00]2: 那这个听起来就感觉就像淘汰那些不必要的步骤， 只留下最优最有效的方案。
    [03:30.69]1: 没错， 他通过一个具体的例子三人扑克游戏， 这个例子也是博弈论中非常经典的一个例子， 就来来解释这些理论的应用。
    [03:39.47]2: 哦，那这个例子呢，确实会让复杂的东西变得容易理解。 希望以后能有更多的这种例子。
    [03:45.77]1: 那更好理解， 纳什还指出了这个非合作博弈理论在合作博弈分析中的应用， 他用动态的方法，把合作的问题转化成更大规模的非合作问题， 那就比较容易处理了。
    [03:59.40]2: 嗯，嗯， 这种转换也很巧妙， 为这个事情提供了新的视角。
    [04:03.85]1: 嗯，总结一下， 纳什的工作其实对博弈论影响非常大， 一方面他引入了这个均衡点的概念， 另一方面他将这个概念推广到各种不同的环境。 不仅是小型的博弈， 其实在很多其他领域， 像经济学， 政治学和心理学， 社会学，都有一些应用。 而且它其实给我们提供了一个理解社会互动的新视角， 比如说在政治里面， 就是纳什均衡点。其实帮助解释了很多政治行为， 也解释了很多国家和集团之间的合作和冲突。
    [04:36.64]2: 嗯嗯，对。那这个纳什的论文其实也引发了后续的很多工作，
    [04:41.34]1: 嗯，
    [04:42.20]2: 嗯。那当然，我们今天的这一期，其实只是想稍微介绍一下纳什均衡点， 也带大家简单了解一下纳什的这个研究。 对，简单的理论，却有着无限的延展空间， 所以还是非常期待在未来的生活中，或者是在更多的学科领域当中， 希望有更多有趣的研究出现，
    [04:59.92]1: 是的，
    [05:00.50]2: 嗯，好，那今天的这一期就先到这里了，
    [05:03.41]1: 嗯，
    `
    const lyrics5 = parseLyric(lrc5);
    dom.lyric5.innerHTML = lyrics5[0].text;
    dom.player5.ontimeupdate = () => {
        const time = dom.player5.currentTime;
        const index = syncLyric(lyrics5, time);

        if (index == null) return;
        dom.lyric5.innerHTML = lyrics5[index].text;
    }
    

    const lrc6 = `
    [00:00.00]1: 我觉得啊，就是经历了这么多年的经验， 就是补剂的作用就是九分的努力， 十分之一的补剂。
    [00:05.55]2: 嗯，
    [00:05.90]1: 选的话肯定是九分更重要，但是我觉得补剂它能够让你九分的努力更加的有效率，更加的避免徒劳无功。
    [00:12.69]2: 嗯，
    [00:12.95]1: 就是你，你你得先得真的锻炼，真的努力，真的健康饮食，然后再考虑补剂， 那你再加十十分之一的补剂的话，他可能就是说啊， 一半是心理作用，
    [00:22.71]2: 对，其实很多时候心理作用是非常重要的，
    [00:25.43]1: 嗯，
    [00:25.90]2: 然后我每次用补剂的时候，我就会更加努力。
    `
    const lyrics6 = parseLyric(lrc6);
    dom.lyric6.innerHTML = lyrics6[0].text;
    
    dom.player6.ontimeupdate = () => {
        const time = dom.player6.currentTime;
        const index = syncLyric(lyrics6, time);

        if (index == null) return;
        dom.lyric6.innerHTML = lyrics6[index].text;
    };

    const lrc7 = `
    [00:00.00]1: 谢谢 这是过年了啊。
    [00:01.41]2: 就是啊。
    [00:02.20]1: 啊 我们老哥俩给大伙拜年。
    [00:04.16]2: 诶，应该的。
    [00:05.18]1: 先得给于老师道喜。
    [00:06.95]2: 给我道什么喜啊。
    [00:08.28]1: 你看看，双喜临门呐。
    [00:10.23]2: 哪啊。
    [00:10.98]1: 一个是过年了。
    [00:12.00]2: 是。
    [00:12.37]1: 一个是您得了一个影帝。
    [00:14.21]2: 哎哟呵，您太捧我了。
    `
    const lyrics7 = parseLyric(lrc7);
    dom.lyric7.innerHTML = lyrics7[0].text;
    
    dom.player7.ontimeupdate = () => {
        const time = dom.player7.currentTime;
        const index = syncLyric(lyrics7, time);

        if (index == null) return;
        dom.lyric7.innerHTML = lyrics7[index].text;
    };


};