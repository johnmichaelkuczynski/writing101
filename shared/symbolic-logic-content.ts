export const symbolicLogicContent = {
  title: "Introduction to Symbolic Logic",
  author: "J.-M. Kuczynski",
  sections: [
    {
      id: "inference-concept",
      title: "1.0 The concept of an inference",
      content: `<div class="document-content">
        <h2 id="inference-concept" class="text-xl font-bold mb-4">1.0 The concept of an inference</h2>
        <p class="document-paragraph mb-4">To make an inference is to form a new belief on the basis of an old one. Here is an example. My friend Larry has been evicted from his apartment. I let him stay with me until he finds a new place to live. I notice that, shortly after Larry moves in, all of my money and valuables start disappearing. I also notice that purchases that I didn't make are appearing on my credit card bills. I know that nobody other than Larry had access to my money, valuables, and credit cards. So I infer that Larry has stolen my money and valuables and illicitly used my credit cards.</p>
        <p class="document-paragraph mb-4">Inferential knowledge is indirect knowledge. Non-inferential knowledge is direct knowledge. There is some reason to believe that all knowledge is inferential. (This issue is discussed in Section 5.) In any case, it's clear that some knowledge is relatively direct. My knowledge that I am now typing on a keyboard is more direct than my knowledge that heat is molecular motion.</p>
      </div>`
    },
    {
      id: "inductive-deductive",
      title: "1.1 Inductive inference vs. deductive inference",
      content: `<div class="document-content">
        <h2 id="inductive-deductive" class="text-xl font-bold mb-4">1.1 Inductive inference vs. deductive inference</h2>
        <p class="document-paragraph mb-4">A premise is a belief that one either has or is willing to accept for argument's sake. An inference always begins with certain premises and ends with a conclusion that one accepts on the basis of those premises. An inference is legitimate if the premises warrants acceptance of the conclusion.</p>
        <p class="document-paragraph mb-4">There are two very different reasons why acceptance of P might warrant acceptance of Q. On the one hand, it might be impossible, for reasons of a strictly logical nature, that Q should be false if P is true. (P: Smith owns 127 cars. Q: Smith owns more than 100 cars.) On the other hand, it might be unlikely, but not impossible, that Q should be false if P is true. (P: Smith owns 127 cars. Q: Smith is very wealthy.)</p>
        <p class="document-paragraph mb-4">P entails Q if it is logically impossible that Q should be false if P is true. P confirms Q if P increases the likelihood that Q is true.</p>
        <p class="document-paragraph mb-4">Given only that P confirms Q, it doesn't follow that acceptance of P warrants acceptance of Q. Smith is more likely to find a cure for cancer if he is intelligent than if he is unintelligent, and P: Smith is intelligent therefore confirms Q: Smith will find a cure for cancer.</p>
        <p class="document-paragraph mb-4">But acceptance of P obviously doesn't warrant acceptance of Q, since Q is more likely than not to be false even if P is true. By the same token, P does warrant acceptance of R: Smith has not had more than 10 massive strokes, given that that, if P is true, there is only a small chance that R is false.</p>
      </div>`
    },
    {
      id: "deduction-entailment",
      title: "1.2 Deduction in relation to entailment",
      content: `<div class="document-content">
        <h2 id="deduction-entailment" class="text-xl font-bold mb-4">1.2 Deduction in relation to entailment</h2>
        <p class="document-paragraph mb-4">If P entails Q, then Q can be deduced from P. If a given person knows that P entails Q and on that basis infers Q:</p>
        <p class="document-paragraph mb-4" style="text-align: center;">P: x is a square.<br/>Q: x has more than two sides.</p>
        <p class="document-paragraph mb-4">It is impossible for Q to be false if P is true. Therefore, P entails Q.</p>
        <p class="document-paragraph mb-4">Given only that P entails Q, it doesn't follow that, if one infers Q from P, one is thereby making a legitimate inference.</p>
        <p class="document-paragraph mb-4">If Smith knows that P is true and Smith correctly believes that P entails Q, Smith's inference does not yield knowledge of Q unless Smith's reason for believing that P entails Q is the right one. If Smith believes that squares have 90 sides and for that reason infers Q from P, Smith has not made a legitimate inference, it being a coincidence that he arrived at the right conclusion.</p>
      </div>`
    },
    {
      id: "induction-confirmation",
      title: "1.3 Induction in relation to confirmation",
      content: `<div class="document-content">
        <h2 id="induction-confirmation" class="text-xl font-bold mb-4">1.3 Induction in relation to confirmation</h2>
        <p class="document-paragraph mb-4">P confirms Q if the probability of Q, given P, is higher than the probability of Q, given not-P. Equivalently, P confirms Q if P, if true, raises the probability of Q without giving Q a probability of 100%.</p>
        <p class="document-paragraph mb-4">It follows that a sufficient condition for P's confirming Q is that Q be capable of being legitimately inductively inferred from P:</p>
        <p class="document-paragraph mb-4" style="margin-left: 2rem;">P: Smith drives a Rolls Royce, wears extremely expensive clothes, has an excellent credit rating, has an excellent employment history, all of his jobs being extremely lucrative ones; and, finally, Smith has no criminal record.</p>
        <p class="document-paragraph mb-4" style="margin-left: 2rem;">Q: Smith is wealthy.</p>
        <p class="document-paragraph mb-4">P, if true, makes it sufficiently improbable that Q is false that we may infer Q from P. Such an inference is not deductive, given that Smith might be an extraordinarily talented but penniless con-artist.</p>
        <p class="document-paragraph mb-4">Even though Q's being capable of being legitimately inductively inferred from P is sufficient for P's confirming Q, it is not necessary for it.</p>
        <p class="document-paragraph mb-4" style="margin-left: 2rem;">P: Smith is the most intellectually gifted person in Russia.</p>
        <p class="document-paragraph mb-4" style="margin-left: 2rem;">Q: Smith will find a cure for cancer.</p>
        <p class="document-paragraph mb-4">P raises the probability of Q, whereas not-P lowers the probability of Q. Thus, P confirms Q, even though by does not by itself warrant acceptance of Q.</p>
      </div>`
    },
    {
      id: "validity-soundness",
      title: "1.4 Validity vs. soundness",
      content: `<div class="document-content">
        <h2 id="validity-soundness" class="text-xl font-bold mb-4">1.4 Validity vs. soundness</h2>
        <p class="document-paragraph mb-4">A valid argument is a deductive argument whose premises, if true, in fact give a probability of 100% to the conclusion. In other words, a valid argument is an argument whose premises are supposed to give 100% probability to the conclusion and whose premises in fact give 100% probability to the conclusion.</p>
        <p class="document-paragraph mb-4">A valid argument can have false premises. For an argument to be valid it is necessary only that if the premises were true, then there would be a 100% chance that the conclusion is true. It may be that Smith doesn't drive a Rolls Royce or any kind of car for that matter. But it's still the case that if Smith did drive a Rolls Royce, then, given that all Rolls Royces are cars, there would be no chance that Smith didn't drive a car.</p>
        <p class="document-paragraph mb-4">A sound argument is a valid argument with true premises. (For example: JMK is a human; all humans are mammals; therefore, JMK is a mammal.)</p>
        <p class="document-paragraph mb-4">A valid argument cannot possibly have true premises and a false conclusion, but it can have false premises and a false conclusion or false premises and a true conclusion.</p>
      </div>`
    },
    {
      id: "two-kinds-induction",
      title: "1.5 Two kinds of induction",
      content: `<div class="document-content">
        <h2 id="two-kinds-induction" class="text-xl font-bold mb-4">1.5 Two kinds of induction</h2>
        <p class="document-paragraph mb-4">There are two kinds of inductive inference: induction by enumeration and inference to the best explanation.</p>
        <p class="document-paragraph mb-4">If, on the basis of the fact that you know of many x's that are y's and of no x's that aren't y's, you infer that all x's are y's or that the next x you encounter is a y, you've performed a case of induction by enumeration.</p>
        <p class="document-paragraph mb-4">Here is an example. You've seen a million swans. They were all white. (Moreover, you knew in each case that what you were seeing was a white swan—you didn't think it was, for example, a beige duck.) You've never seen, or otherwise come to know of, any non-white swan. On this basis, you infer that all swans are white and, therefore, that, if you ever encounter another swan, it will be white.</p>
        <p class="document-paragraph mb-4">If, in order to account for something of which you have knowledge, you posit the existence of something of which you don't have knowledge; you have made an inference to the best explanation.</p>
        <p class="document-paragraph mb-4">All theories are cases of inference to the best explanation. All the theories put forth by Einstein, Darwin, Freud are instances of this mode of inference. Inference to the best explanation is a very powerful form of inference. (In fact, we will see in Section 1.7. that it is the only form of non-deductive inference. So-called "induction by enumeration," to the extent that it isn't a spurious method of inference, collapses into inference to the best explanation.)</p>
      </div>`
    },
    {
      id: "induction-enumeration",
      title: "1.6 A fact about induction by enumeration",
      content: `<div class="document-content">
        <h2 id="induction-enumeration" class="text-xl font-bold mb-4">1.6 A fact about induction by enumeration</h2>
        <p class="document-paragraph mb-4">Induction by enumeration isn't nearly as powerful a form of inference as inference to the best explanation. Given only that every single one of the 5,000 first editions you've ever come across smelled like pipe tobacco, you cannot reasonably infer that all first editions smell like pipe tobacco. What if all of those first editions were the property of your pipe-smoking friend Larry? In that case, you'd have good to reason to suspect that their smelling like pipe tobacco had to do, not with their being first editions, but with their being things that had been around Larry.</p>
        <p class="document-paragraph mb-4">By the same token, so far as you are entitled to infer that all first editions smell like pipe tobacco, it's only to the extent that you have reason to believe that a thing's smelling like pipe tobacco is rooted in its being a first edition. But that means that, if the data entitles you to infer that all first editions smell like pipe tobacco, it's only because it also entitles you to accept some inference to the best explanation (one to the effect that a thing's being a first edition is, for some reason or other, responsible for its smelling like pipe tobacco).</p>
        <p class="document-paragraph mb-4">In general, induction by enumeration is parasitic on inference to the best explanation. In Chapter 12 of Analytic Philosophy, it is shown how a failure to see this underlies the spurious belief that there is no non-deductive, inferential knowledge.</p>
      </div>`
    },
    {
      id: "two-kinds-entailment",
      title: "1.7 Two kinds of entailment",
      content: `<div class="document-content">
        <h2 id="two-kinds-entailment" class="text-xl font-bold mb-4">1.7 Two kinds of entailment</h2>
        <p class="document-paragraph mb-4">There are two kinds of entailment: logical entailment and ontological entailment. Here are paradigmatic examples of each:</p>
        <p class="document-paragraph mb-4" style="font-weight: bold;">Logical entailment:</p>
        <p class="document-paragraph mb-4" style="margin-left: 2rem;">Premise: Either Jones is dead or Jones is alive.<br/>Conclusion: Jones is alive or Jones is dead.</p>
        <p class="document-paragraph mb-4" style="font-weight: bold;">Ontological entailment:</p>
        <p class="document-paragraph mb-4" style="margin-left: 2rem;">Premise: That car is red.<br/>Conclusion: That car is colored.</p>
        <p class="document-paragraph mb-4">The first is a case of logical entailment for the reason that the premise means the same thing as the conclusion. The second is a case of ontological entailment because the premise doesn't mean the same thing as the conclusion, but it's still impossible, for reasons having to do with the nature of reality (as opposed to the nature of language), for the premise to be true and the conclusion false.</p>
        <p class="document-paragraph mb-4">Also, the second inference is a case of ontological entailment because the premise doesn't mean the same thing as the conclusion, but reality is such that the premise cannot be true unless the conclusion is true.</p>
      </div>`
    },
    {
      id: "notational-conventions",
      title: "2.0 Some notational conventions relevant to formal logic",
      content: `<div class="document-content">
        <h2 id="notational-conventions" class="text-xl font-bold mb-4">2.0 Some notational conventions relevant to formal logic</h2>
        <p class="document-paragraph mb-4">This section covers various notational conventions used in formal logic, including biconditionals, parentheses, negation, modal operators, and logical connectives.</p>
      </div>`
    },
    {
      id: "general-principles",
      title: "2.1 Some general principles relevant to formal logic",
      content: `<div class="document-content">
        <h2 id="general-principles" class="text-xl font-bold mb-4">2.1 Some general principles relevant to formal logic</h2>
        <p class="document-paragraph mb-4">This section discusses general principles that apply to formal logic systems and their applications.</p>
      </div>`
    },
    {
      id: "principles-theorems",
      title: "2.3 Principles and theorems of formal logic",
      content: `<div class="document-content">
        <h2 id="principles-theorems" class="text-xl font-bold mb-4">2.3 Principles and theorems of formal logic</h2>
        <p class="document-paragraph mb-4">This section presents key principles and theorems that form the foundation of formal logic systems.</p>
      </div>`
    },
    {
      id: "meta-logical-principles",
      title: "3.0 Some meta-logical principles: Model theoretic entailment",
      content: `<div class="document-content">
        <h2 id="meta-logical-principles" class="text-xl font-bold mb-4">3.0 Some meta-logical principles: Model theoretic entailment</h2>
        <p class="document-paragraph mb-4">This section discusses meta-logical principles and model theoretic approaches to entailment in formal logic systems.</p>
      </div>`
    },
    {
      id: "formal-entailment",
      title: "3.1 Formal entailment",
      content: `<div class="document-content">
        <h2 id="formal-entailment" class="text-xl font-bold mb-4">3.1 Formal entailment</h2>
        <p class="document-paragraph mb-4">This section explores the concept of formal entailment and its role in logical systems.</p>
      </div>`
    },
    {
      id: "entailment-expressions",
      title: "3.2 Formal entailment a relation between expressions",
      content: `<div class="document-content">
        <h2 id="entailment-expressions" class="text-xl font-bold mb-4">3.2 Formal entailment a relation between expressions</h2>
        <p class="document-paragraph mb-4">This section examines formal entailment as a relation between logical expressions.</p>
      </div>`
    },
    {
      id: "important-entailment",
      title: "3.3 The one genuinely important kind of entailment",
      content: `<div class="document-content">
        <h2 id="important-entailment" class="text-xl font-bold mb-4">3.3 The one genuinely important kind of entailment</h2>
        <p class="document-paragraph mb-4">This section discusses the most significant type of entailment in logical reasoning.</p>
      </div>`
    },
    {
      id: "ampliative-character",
      title: "3.5 The ampliative character of deduction",
      content: `<div class="document-content">
        <h2 id="ampliative-character" class="text-xl font-bold mb-4">3.5 The ampliative character of deduction</h2>
        <p class="document-paragraph mb-4">This section explores the ampliative aspects of deductive reasoning.</p>
      </div>`
    },
    {
      id: "most-important-entailment",
      title: "3.6 The most important kind of entailment",
      content: `<div class="document-content">
        <h2 id="most-important-entailment" class="text-xl font-bold mb-4">3.6 The most important kind of entailment</h2>
        <p class="document-paragraph mb-4">This section identifies and discusses the most important type of entailment relation.</p>
      </div>`
    },
    {
      id: "entailment-confirmation",
      title: "3.7 Entailment not a limiting case of confirmation",
      content: `<div class="document-content">
        <h2 id="entailment-confirmation" class="text-xl font-bold mb-4">3.7 Entailment not a limiting case of confirmation</h2>
        <p class="document-paragraph mb-4">This section argues that entailment is not simply a limiting case of confirmation.</p>
      </div>`
    },
    {
      id: "entailment-relations",
      title: "3.8 Entailment both an intersentential and an interpropositional relation",
      content: `<div class="document-content">
        <h2 id="entailment-relations" class="text-xl font-bold mb-4">3.8 Entailment both an intersentential and an interpropositional relation</h2>
        <p class="document-paragraph mb-4">This section explores entailment as both a relation between sentences and propositions.</p>
      </div>`
    },
    {
      id: "logical-equivalence",
      title: "3.8.1 Four kinds of logical equivalence",
      content: `<div class="document-content">
        <h2 id="logical-equivalence" class="text-xl font-bold mb-4">3.8.1 Four kinds of logical equivalence</h2>
        <p class="document-paragraph mb-4">This section identifies and describes four distinct types of logical equivalence.</p>
      </div>`
    },
    {
      id: "formal-logic-irrelevance",
      title: "3.9 The irrelevance of formal logic to thought",
      content: `<div class="document-content">
        <h2 id="formal-logic-irrelevance" class="text-xl font-bold mb-4">3.9 The irrelevance of formal logic to thought</h2>
        <p class="document-paragraph mb-4">This section examines arguments about the irrelevance of formal logic to human thought processes.</p>
      </div>`
    },
    {
      id: "models",
      title: "4.0 Models",
      content: `<div class="document-content">
        <h2 id="models" class="text-xl font-bold mb-4">4.0 Models</h2>
        <p class="document-paragraph mb-4">This section covers the concept of models in formal logic and their role in semantic interpretation.</p>
      </div>`
    },
    {
      id: "knowledge-inferential",
      title: "5.0 Proof that all knowledge is inferential",
      content: `<div class="document-content">
        <h2 id="knowledge-inferential" class="text-xl font-bold mb-4">5.0 Proof that all knowledge is inferential</h2>
        <p class="document-paragraph mb-4">This section provides arguments for the claim that all knowledge is ultimately inferential in nature.</p>
      </div>`
    },
    {
      id: "non-empirical-truths",
      title: "5.1 Proof that some truths are non-empirical",
      content: `<div class="document-content">
        <h2 id="non-empirical-truths" class="text-xl font-bold mb-4">5.1 Proof that some truths are non-empirical</h2>
        <p class="document-paragraph mb-4">This section demonstrates that certain truths exist independently of empirical observation.</p>
      </div>`
    },
    {
      id: "set-theoretic-characterizations",
      title: "6.0 Set-theoretic characterizations of truth, meaning, and entailment",
      content: `<div class="document-content">
        <h2 id="set-theoretic-characterizations" class="text-xl font-bold mb-4">6.0 Set-theoretic characterizations of truth, meaning, and entailment</h2>
        <p class="document-paragraph mb-4">This section explores set-theoretic approaches to understanding truth, meaning, and entailment relations.</p>
      </div>`
    },
    {
      id: "sequel-outline",
      title: "7.0 Outline of the contents of the sequel to this volume",
      content: `<div class="document-content">
        <h2 id="sequel-outline" class="text-xl font-bold mb-4">7.0 Outline of the contents of the sequel to this volume</h2>
        <p class="document-paragraph mb-4">This section provides an overview of topics to be covered in the sequel, including functions, recursive definitions, cardinals, formal languages, incompleteness, and other advanced topics.</p>
      </div>`
    },
    {
      id: "function",
      title: "7.1 Function",
      content: `<div class="document-content">
        <h2 id="function" class="text-xl font-bold mb-4">7.1 Function</h2>
        <p class="document-paragraph mb-4">This section covers the mathematical concept of functions and their applications in logic.</p>
      </div>`
    },
    {
      id: "recursive-definition",
      title: "7.2 Recursive definition",
      content: `<div class="document-content">
        <h2 id="recursive-definition" class="text-xl font-bold mb-4">7.2 Recursive definition</h2>
        <p class="document-paragraph mb-4">This section explores recursive definitions and their role in mathematical logic.</p>
      </div>`
    },
    {
      id: "cardinals-rationals-reals",
      title: "7.3 Cardinals, rationals, and reals",
      content: `<div class="document-content">
        <h2 id="cardinals-rationals-reals" class="text-xl font-bold mb-4">7.3 Cardinals, rationals, and reals</h2>
        <p class="document-paragraph mb-4">This section discusses cardinal numbers, rational numbers, and real numbers in mathematical logic.</p>
      </div>`
    },
    {
      id: "formal-languages",
      title: "7.4 Formal languages",
      content: `<div class="document-content">
        <h2 id="formal-languages" class="text-xl font-bold mb-4">7.4 Formal languages</h2>
        <p class="document-paragraph mb-4">This section covers formal languages and their syntax and semantics in logic.</p>
      </div>`
    },
    {
      id: "incompleteness",
      title: "7.5 Incompleteness",
      content: `<div class="document-content">
        <h2 id="incompleteness" class="text-xl font-bold mb-4">7.5 Incompleteness</h2>
        <p class="document-paragraph mb-4">This section discusses incompleteness theorems and their implications for logical systems.</p>
      </div>`
    },
    {
      id: "axiom-sets",
      title: "7.6 Axiom-sets in relation to incompleteness",
      content: `<div class="document-content">
        <h2 id="axiom-sets" class="text-xl font-bold mb-4">7.6 Axiom-sets in relation to incompleteness</h2>
        <p class="document-paragraph mb-4">This section examines axiom sets and their relationship to incompleteness results.</p>
      </div>`
    },
    {
      id: "compactness-continuity",
      title: "7.7 Compactness vs. continuity",
      content: `<div class="document-content">
        <h2 id="compactness-continuity" class="text-xl font-bold mb-4">7.7 Compactness vs. continuity</h2>
        <p class="document-paragraph mb-4">This section explores the concepts of compactness and continuity in mathematical logic.</p>
      </div>`
    },
    {
      id: "set-measure",
      title: "7.8 Set-measure",
      content: `<div class="document-content">
        <h2 id="set-measure" class="text-xl font-bold mb-4">7.8 Set-measure</h2>
        <p class="document-paragraph mb-4">This section discusses set-measure theory and its applications in logic.</p>
      </div>`
    },
    {
      id: "nil-infinitesimal",
      title: "7.9 Nil vs. infinitesimal",
      content: `<div class="document-content">
        <h2 id="nil-infinitesimal" class="text-xl font-bold mb-4">7.9 Nil vs. infinitesimal</h2>
        <p class="document-paragraph mb-4">This section examines the distinction between nil and infinitesimal quantities.</p>
      </div>`
    },
    {
      id: "dimensionality",
      title: "7.10 Dimensionality",
      content: `<div class="document-content">
        <h2 id="dimensionality" class="text-xl font-bold mb-4">7.10 Dimensionality</h2>
        <p class="document-paragraph mb-4">This section explores the concept of dimensionality in mathematical and logical contexts.</p>
      </div>`
    }
  ]
};