var ToteFlosfulgurManual = {};

ToteFlosfulgurManual.page = function (label, luminosity, school, genus, name, text, maxHave=0, reqHave=0) {
    return {
        label: label,
        luminosity: luminosity,
        school: school,
        genus: genus,
        name: name,
        text: text,
        maxHave: maxHave,
        reqHave: reqHave,
    };
};





ToteFlosfulgurManual.title = "A Flosfulgur Handbook"
ToteFlosfulgurManual.subtitle = "The Surfabricon"
ToteFlosfulgurManual.author = "After Megistol"
ToteFlosfulgurManual.subauthor = "The Sand Grump"
ToteFlosfulgurManual.introduction = `<p>You'll hear many things, and they might confuse you. You'll feel many things, and they might scare you. And so my advice to you is to hold on to the following maxims:
<ul>
<li>You are no one; become someone.</li>
<li>Beware useless atoms; cards are the threads to pinch.</li>
<li>Don't pee in the bath.</li>
</ul>
Flosfulgur is rife with misunderstanding. Don't worry about understanding. Seize some valuables and make a dash for the fuck out of here. Oh, and only believe what you read. Maybe that should be a maxim, but I'm not sure it's true.</p>
`;
ToteFlosfulgurManual.know = `<p>Look, I don't have a whole lot of time to explain what I've come to know about Flosfulgur. I'm on the lam! The quick notes in this section should be enough for now. If you need more to get you going, or to pull you out of a rut, or to stop you getting in a rut in the first place, flip to another page in this handbook; they're full of helpful things. But remember that maxim about card atomism! A book made from a deck of cards isn't what you're used to reading, I'm sure.</p>

<p>The quick notes that I mentioned are these:
<ul>
<li>There are five schools: Averse, Axiomatic, Unific, Chaotic, Agnostic. Look out for all of them. Trust the card fabric!</li>
<li>The schools have colors, but I'm colorblind, so I can't be much help them. But I hear the colors matter!</li>
<li>There are seven atomic genera: trivial, axial, trigonal, tetragonal, pentagonal, hexagonal, circular. Damened if I know what they mean.</li>
<li>A tepal is what you call a flower petal when you don't know much about it.</li>
<li>A corolla is a collection of related tepals.</li>
<li>You got sand, lightning, and liquids. Most everything's one of those in this shithole. Oh, and then there's flowers, but don't mix them up with lightning! I have a few scars to remind me of that ... I'm sure you'll get your own.</li>
<li>Atoms have an inherent order, but the schools don't agree on it. If you ask me, everything's 0, but no one ever asks me.</li>
<li>There are other grumps like me. Maybe you'll learn to be a grump, too!</li>
</ul>
</p>
`;



ToteFlosfulgurManual.pages = [
    ToteFlosfulgurManual.page("0-0-0", 0, 0, 0, "blank",
        "<i>There's nothing on this page.</i>",
    ),
    ToteFlosfulgurManual.page("0-1-0", 0, 0, 7, "scribbles",
        "<i>This page is covered in indecipherable scribbles: scribble, scribble, scribble, scribble, scribble, scribble, scribble, scribble, scribble, scribble, scribble, scribble, scribble, scribble, scribble, scribble, scribble, scribble, scribble, scribble, scribble, scribble.</i>",
    ),
    ToteFlosfulgurManual.page("0-2-0", 1, 0, 0,
        "money",
        "Get some money, and see if that helps. It turns out having a bunch of money is an awful lot of fun.",
        1,
    ),
    ToteFlosfulgurManual.page("0-3-0", 1, 0, 0,
        "give up",
        "I'd close this book if I were you. There's probably a lot more going on out there than in here. What were you hoping for? Answers? Maybe come back later when you're a little more someone than no one.",
        1,
        15,
    ),
    ToteFlosfulgurManual.page("0-3-1", 2, 0, 0,
        "kill yourself",
        "Look, if you're this determined to do something stupid, you're the perfect candidate for a little thing called suicide. Check it out!",
        1,
        35,
    ),
]
