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
        lyric8: document.querySelector(".lyric8"),
        player8: document.querySelector(".player8"),
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
    [00:00.00]1: 欢迎收听今天的播客， 哎，我们今天要聊点什么呢？
    [00:02.50]2: 嗯，今天我们来聊一个很有意思的话题，就是，博弈论。
    [00:06.50]1: 博弈论？ 这个，这个听起来有点高大上啊，能不能用我们普通人能听懂的话来解释一下呢？
    [00:12.00]2: 没问题。 其实，博弈论，这个，就是研究人们怎么做决策的。 想象一下啊， 你跟别人下棋，打牌，或者，呃，公司之间竞争，这些其实都是博弈。每个人都想赢，对吧？
    [00:24.00]1: 嗯。
    [00:24.50]2: 但是每个人的行动，又会互相影响。 博弈论，就是想找到一种，呃， 最好的策略，让你在跟别人互动的时候，能够得到最好的结果。
    [00:33.30]1: 哦，有点像，呃，那种什么三十六计的感觉？
    [00:37.00]2: 哈哈，有点那个意思。不过，博弈论更，更科学一些，它会用数学模型来分析这些问题。
    [00:42.70]1: 哇，数学模型。 听起来很厉害。 那我们今天是不是要聊一个很厉害的博弈论文章？
    [00:48.30]2: 对。我们今天要聊的是一篇，这个，经典论文，叫，非合作博弈。
    [00:52.60]1: 非合作博弈？ 听名字就感觉和一般的博弈不太一样呢。   
    [00:57.00]2: 是的。这篇论文的作者是约翰纳什，一位非常著名的数学家。大家可能都看过电影， 美丽心灵 ，讲的就是他的故事。
    [01:05.00]1: 哦，原来是他，我知道这部电影。那这个，非合作博弈，它和合作博弈有什么区别呢？
    [01:10.40]2: 嗯， 这么说吧，合作博弈呢，就是大家可以商量着来，可以达成协议，一起合作，共同对敌。 比如几家公司可以组成联盟，一起来，呃，垄断市场，这就是合作博弈。
    [01:21.00]1: 哦， 那非合作博弈呢？
    [01:23.00]2: 非合作博弈，就是大家各玩各的，谁也不理谁，不能商量，也不能签合同，一切都靠自己。 每个人都只想着，让自己赢，或者得到最好的结果。
    [01:31.00]1: 哦，我感觉现实生活中好像更多的是非合作博弈呢。 像我们平时，呃，买东西砍价啊，或者找工作谈工资啊，好像都是这种，呃，非合作的情况。
    [01:41.50]2: 对。纳什的这篇论文，就是提出了一个，呃，非常重要的概念，来研究这种非合作博弈的情况，这个概念叫做均衡点。
    [01:48.40]1: 均衡点？听起来有点抽象。
    [01:50.43]2: 其实不难理解。我们来举个例子， 假设， 你和我玩石头剪刀布。 你出什么，我出什么，是不是都有可能？
    [01:57.00]1: 嗯。
    [01:57.80]2: 但是，如果，我们都随机出，每次都随便出石头，剪刀，或者布，而且概率都一样，都是三分之一。 这种情况下，谁也占不到便宜，对吧？
    [02:05.62]1: 对，长期来看，输赢应该是差不多的。
    [02:08.55]2: 嗯，这就是一个均衡点。 在这个点上，任何一方，单方面改变策略，都不会让自己更好。 你要是总出石头，我肯定就总出布，你反而输得更多，对吧？
    [02:17.28]1: 是这样。
    [02:18.10]2: 所以，均衡点，就是一种，大家都很，都很稳定的状态。 谁也没有动力去改变自己的策略。
    [02:24.10]1: 那这个均衡点，是不是意味着大家就一定，呃，都赢了，或者都输了？
    [02:29.30]2: 不一定。均衡点只是说，在这个状态下，大家都没有改变的动机。 至于结果是好是坏，那要看具体的博弈是什么样的。 有的博弈，均衡点可能对大家都好，有的可能对大家都不好，也有的可能对一方好，对另一方不好。
    [02:41.80]1: 哦，我大概明白了。 那，这篇论文是不是证明了，所有这样的，呃，非合作博弈，都存在均衡点呢？
    [02:49.10]2: 对。 纳什证明了，在有限非合作博弈中，至少存在一个均衡点。 这里的，有限，指的是，每个人的选择是有限的。 就像石头剪刀布，只有三种选择，不是无限多种。
    [02:59.57]1: 哦，那这个证明是不是很难啊？
    [03:01.50]2: 相当难。 他用了一个叫做布劳威尔不动点定理的数学工具来证明的。 这个定理，呃，我们普通人可能不太好理解， 它大概的意思是说， 在一个，呃，封闭的空间里， 如果你有一个连续的变换， 那一定有一个点，在这个变换下是不动的。
    [03:17.70]1: 呃，还是不太明白，不过听起来很厉害的样子。
    [03:20.50]2: 没关系，我们知道结论就行了。 纳什的这个证明，非常重要， 因为它告诉我们， 即使在非合作的情况下， 我们也可以，呃，预测，或者分析，大家最后会怎么做。
    [03:29.80]1: 嗯。感觉博弈论很有用，它不仅仅是研究打牌，下棋。
    [03:34.16]2: 对，可以应用到各种领域。比如说，呃，公司之间的竞争，可以分析他们怎么定价，怎么做广告。 国际关系，可以分析，呃，国家之间的谈判， 还有，呃， 拍卖， 怎么设计拍卖规则，等等。
    [03:46.00]1: 听你这么一说，感觉生活中处处都是博弈啊。
    [03:48.70]2: 是啊。纳什这篇论文还提到了，博弈的对称性。有些博弈是对称的，这样分析起来就更简单。
    [03:55.35]1: 什么是博弈的对称性？
    [03:57.00]2: 简单来说，如果一个博弈中，参与者的地位是相同的，他们的选择和收益都一样，那么这个博弈就是对称的。纳什证明了，任何有限博弈都存在一个对称均衡点。
    [04:07.71]1: 哇，今天真是学到了不少东西，感觉博弈论真是太有意思了。
    [04:11.35]2: 是啊，博弈论是一个非常有意思，而且非常重要的领域。 纳什的这篇论文，只是一个开始， 后来有很多学者，在这个基础上，做了很多更深入的研究。
    [04:21.11]1: 我觉得这个非合作博弈的思想，其实，呃，对我们普通人也很有启发。 以后我们在做决策的时候，也可以想想，别人会怎么做， 然后，呃，找到一个对自己最有利的策略。
    [04:31.90]2: 是啊， 这就是博弈论的魅力所在。 它能帮助我们，更理性地思考问题， 做出更好的决策。
    [04:38.50]1: 是的呢，好了，我们今天的节目就到这里了，感谢大家的收听，我们下期再见。
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
    [00:00.00]1: Welcome back to the podcast, everyone. Today we're diving into the world of, uh, A I, specifically the 2024 Nobel Prize in Physics, which actually went to two pioneers in machine learning.
    [00:11.00]2: Yeah, it's pretty exciting, right? They recognized, uh, John Hopfield and Geoffrey Hinton for their work on artificial neural networks. It's kinda like the foundation for a lot of the A I we see today.
    [00:23.70]1: Okay, so, artificial neural networks. That sounds complicated. Can you break that down for us, like, what are they, basically?
    [00:29.60]2: Sure. So, imagine your brain, right? It's made up of billions of these tiny things called neurons, all connected to each other.
    [00:37.20]1: Right.
    [00:37.70]2: And they send signals back and forth, and that's how we, like, think and remember things. An artificial neural network is kind of a computer's attempt to, uh, mimic that.
    [00:46.70]1: Okay.
    [00:47.10]2: It's a bunch of, you know, digital neurons connected in a specific way, and they can learn to do things by adjusting the strengths of those connections.
    [00:55.40]1: So it's like a, a digital brain, almost?
    [00:57.40]2: Yeah, you could think of it that way, it's a simplified model, but it's inspired by how our brains work. It is not exactly the same, but it takes a cue from nature, you know.
    [01:07.50]1: So, what did Hopfield do that was so, uh, Nobel Prize worthy?   
    [01:11.20]2: Well, Hopfield, he came up with this thing called the Hopfield network. And it's all about associative memory.
    [01:16.50]1: Associative memory, like, remembering things based on associations?
    [01:19.90]2: Exactly. Like, you see part of a picture, and your brain instantly fills in the rest, right?
    [01:24.10]1: Yeah.
    [01:24.60]2: Or you hear a few notes of a song, and you know the whole song. That's associative memory.
    [01:28.90]1: Okay, so his network could do that?
    [01:30.40]2: Yeah, He figured out a way to design a network that could store patterns, like images or, um, sequences of data. And then, if you gave it an incomplete or noisy version of that pattern, it could retrieve the complete, clean version.
    [01:42.30]1: Wow, that's pretty cool. So how does it actually, like, work? Is it magic?
    [01:46.30]2: No magic, haha, it's physics. He used ideas from, uh, physics, actually. Specifically, how atoms behave in materials. He imagined the digital neurons like atoms and their status is like a material's atomic spin.
    [01:59.00]1: Okay, now you are losing me again.
    [02:00.70]2: Okay, so, think of it like this, in some materials, all the tiny atomic magnets like to line up, right?
    [02:06.10]1: Uh huh.
    [02:06.60]2: That gives the material certain properties. Hopfield used a similar idea. He created a network, and when they're, you know, communicating, it looks for the lowest energy state. The stored memories are like those low energy states
    [02:18.80]1: So, the incomplete image is like a, a nudge towards the, uh, the full memory, and the network just kind of falls into place?
    [02:24.30]2: Exactly. It's like the network is relaxing into the closest stored memory. Like rolling a marble down a hill, and it settles in a valley, right?
    [02:31.90]1: Okay, I think I'm getting it. The valleys are memories. That's a pretty neat analogy. So, what about, uh, Hinton? What was his contribution?
    [02:39.00]2: Hinton built on Hopfield's work. He developed something called the Boltzmann machine.
    [02:43.60]1: Boltzmann machine. Sounds even more intimidating.
    [02:45.70]2: It's not so bad. It's another type of neural network, but it's, uh, better at learning complex patterns from data. It uses, like, statistical physics, you know, probabilities, and, um, randomness, to help it learn.
    [02:57.50]1: Randomness? How does that help?
    [02:59.10]2: Well, it helps the network explore different possibilities, you know. It's like, it's not just stuck in one way of thinking. It can try out different, um, configurations of those connections between the neurons, and find the ones that work best for representing the data.
    [03:13.00]1: So, it's like, experimenting to find the, uh, optimal solution?
    [03:16.30]2: Yeah, exactly. And, importantly, it can learn to identify the important features in the data itself. Like, if you're showing it pictures of cats, it learns what makes a cat a cat, without you having to tell it, you know, look for pointy ears or whatever.
    [03:28.80]1: That's really the key to machine learning, isn't it? The machine figuring things out on its own?
    [03:32.50]2: Right. And that is super important. Before, you had to program a machine to look for specific details, but Hinton showed that it could kind of figure it out by itself.
    [03:40.50]1: So like teaching a kid with lots of examples, instead of a rule book?
    [03:43.80]2: Yeah that's a great way to put it. Just keep feeding examples, and they will learn eventually. And, you know, Hinton's work, it really laid the groundwork for a lot of the deep learning techniques that are, um, so powerful today.
    [03:54.80]1: Deep learning, that's the stuff that powers, like, image recognition and, uh, language translation, right?
    [04:00.00]2: Yeah, exactly. And a whole bunch of other things. It's a really big deal.
    [04:02.80]1: So, these two guys, working decades ago, their work is still relevant today?
    [04:06.60]2: Absolutely. Their ideas, they're fundamental. Of course, things have advanced a lot since then, but, um, their work is kind of like the, the foundation that everything else is built on. It's like how classical mechanics is to modern physics. It's a different era, but some fundamentals never expire.
    [04:22.10]1: And it's, kind of, cool that it's, uh, all based on this, like, analogy to how the brain works, you know?
    [04:26.40]2: Yeah, it is. It's a, it's a great example of how, uh, different fields of science can inspire each other. Physics, biology, computer science, all coming together.
    [04:35.00]1: So where does their work, uh, affect us now? Like, practically?
    [04:38.00]2: Oh, everywhere, potentially. Material science, for one. It's influencing how we understand and, um, design new materials. And, you know, all those A I applications, they're all related in some way.
    [04:48.10]1: Makes sense. It's like, they laid the groundwork, and now everyone's building on it, making bigger and better, and sometimes scarier, things.
    [04:54.70]2: Right? It's a very active area, even today. People are still trying to, um, make these networks more efficient, you know, use less energy, less data, make them less biased, all that stuff.
    [05:04.20]1: Less biased? Is that, um, a reference to some of the problems we hear about with A I, like, making unfair decisions?
    [05:10.00]2: Yeah, exactly. If the data you train the network on has biases in it, the network will learn those biases, right? So, that's a big challenge, making sure these systems are, uh, fair and equitable.
    [05:19.50]1: That makes sense. So it's not just about making them smarter, but also making them, uh, ethically sound, I suppose.
    [05:24.40]2: Absolutely. It's a huge area of research, and it's something we need to, you know, really pay attention to as A I gets more and more powerful.
    [05:31.30]1: Well, this has been incredibly enlightening. So, basically, we owe a lot to these two Nobel Prize winners for the A I we, uh, interact with every day, even if we don't realize it.
    [05:40.50]2: Yeah, they really were pioneers. And the field of machine learning keeps growing fast, so who knows what the future will look like, you know?
    [05:46.50]1: It is exciting and a little bit scary all at the same time. Thanks for, uh, walking us through all of this. It really helps to understand the, the basics behind all this, you know, complex technology.
    [05:57.10]2: No problem. Glad to do it.
    [05:58.50]1: And that's all the time we have for today. Join us next time as we continue to explore the fascinating world of science and technology.
    `
    const lyrics6 = parseLyric(lrc6);
    dom.lyric6.innerHTML = lyrics6[0].text;
    dom.player6.ontimeupdate = () => {
        const time = dom.player6.currentTime;
        const index = syncLyric(lyrics6, time);

        if (index == null) return;
        dom.lyric6.innerHTML = lyrics6[index].text;
    }
    

    const lrc7 = `
    [00:00.00]1: 我觉得啊，就是经历了这么多年的经验， 就是补剂的作用就是九分的努力， 十分之一的补剂。
    [00:05.55]2: 嗯，
    [00:05.90]1: 选的话肯定是九分更重要，但是我觉得补剂它能够让你九分的努力更加的有效率，更加的避免徒劳无功。
    [00:12.69]2: 嗯，
    [00:12.95]1: 就是你，你你得先得真的锻炼，真的努力，真的健康饮食，然后再考虑补剂， 那你再加十十分之一的补剂的话，他可能就是说啊， 一半是心理作用，
    [00:22.71]2: 对，其实很多时候心理作用是非常重要的，
    [00:25.43]1: 嗯，
    [00:25.90]2: 然后我每次用补剂的时候，我就会更加努力。
    `
    const lyrics7 = parseLyric(lrc7);
    dom.lyric7.innerHTML = lyrics7[0].text;
    
    dom.player7.ontimeupdate = () => {
        const time = dom.player7.currentTime;
        const index = syncLyric(lyrics7, time);

        if (index == null) return;
        dom.lyric7.innerHTML = lyrics7[index].text;
    };

    const lrc8 = `
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
    const lyrics8 = parseLyric(lrc8);
    dom.lyric8.innerHTML = lyrics8[0].text;
    
    dom.player8.ontimeupdate = () => {
        const time = dom.player8.currentTime;
        const index = syncLyric(lyrics8, time);

        if (index == null) return;
        dom.lyric8.innerHTML = lyrics8[index].text;
    };


};