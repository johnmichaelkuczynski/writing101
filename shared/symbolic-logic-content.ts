export const symbolicLogicContent = {
  sections: [
    {
      id: "symbolic-logic",
      title: "Introduction to Symbolic Logic",
      author: "J.-M. Kuczynski",
      content: `<div class="document-content"><p class="document-paragraph mb-4">Introduction to Symbolic Logic</p><p class="document-paragraph mb-4">J.-M. Kuczynski</p><h3 class="text-xl font-semibold mt-8 mb-4 text-foreground">1.0 The concept of an inference</h3><h3 class="text-xl font-semibold mt-8 mb-4 text-foreground">1.1 Inductive inference vs. deductive inference</h3><h3 class="text-xl font-semibold mt-8 mb-4 text-foreground">1.2 Deduction in relation to entailment</h3><h3 class="text-xl font-semibold mt-8 mb-4 text-foreground">1.3 Induction in relation to confirmation</h3><h3 class="text-xl font-semibold mt-8 mb-4 text-foreground">1.4 Validity vs. soundness</h3><h3 class="text-xl font-semibold mt-8 mb-4 text-foreground">1.5 Two kinds of induction</h3><h3 class="text-xl font-semibold mt-8 mb-4 text-foreground">1.6 A fact about induction by enumeration</h3><h3 class="text-xl font-semibold mt-8 mb-4 text-foreground">1.7 Two kinds of entailment</h3><h3 class="text-xl font-semibold mt-8 mb-4 text-foreground">2.0 Some notational conventions relevant to formal logic</h3><p class="document-paragraph mb-4">Biconditionals and “↔”</p><p class="document-paragraph mb-4">Parentheses as indicators of scope</p><p class="document-paragraph mb-4">Negation</p><p class="document-paragraph mb-4">Negation in relation to the use of parentheses</p><p class="document-paragraph mb-4">The modal operators—the box and the pound sign</p><p class="document-paragraph mb-4">The non-exclusive meaning of “or”</p><p class="document-paragraph mb-4">The Sheffer Stroke</p><p class="document-paragraph mb-4">Compatibility and incompatibility</p><h3 class="text-xl font-semibold mt-8 mb-4 text-foreground">2.1 Some general principles relevant to formal logic</h3><p class="document-paragraph mb-4">Modality</p><h3 class="text-xl font-semibold mt-8 mb-4 text-foreground">2.3 Principles and theorems of formal logic</h3><h3 class="text-xl font-semibold mt-8 mb-4 text-foreground">3.0 Some meta-logical principles: Model theoretic entailment</h3><h3 class="text-xl font-semibold mt-8 mb-4 text-foreground">3.1 Formal entailment</h3><h3 class="text-xl font-semibold mt-8 mb-4 text-foreground">3.2 Formal entailment a relation between expressions</h3><p class="document-paragraph mb-4">3.3 The one genuinely important kind of entailment: The informal, non-</p><p class="document-paragraph mb-4">model-theoretic kind</p><h3 class="text-xl font-semibold mt-8 mb-4 text-foreground">3.5 The ampliative character of deduction</h3><h3 class="text-xl font-semibold mt-8 mb-4 text-foreground">3.6 The most important kind of entailment: the non-formal, non-model</h3><p class="document-paragraph mb-4">theoretic kind</p><h3 class="text-xl font-semibold mt-8 mb-4 text-foreground">3.7 Entailment not a limiting case of confirmation</h3><h3 class="text-xl font-semibold mt-8 mb-4 text-foreground">3.8 Entailment both an intersentential and an interpropositional relation</h3><h3 class="text-xl font-semibold mt-8 mb-4 text-foreground">3.8.1 Four kinds of logical equivalence</h3><h3 class="text-xl font-semibold mt-8 mb-4 text-foreground">3.9 The irrelevance of formal logic to thought</h3><h3 class="text-xl font-semibold mt-8 mb-4 text-foreground">4.0 Models</h3><h3 class="text-xl font-semibold mt-8 mb-4 text-foreground">5.0 Proof that all knowledge is inferential</h3><h3 class="text-xl font-semibold mt-8 mb-4 text-foreground">5.1 Proof that some truths are non-empirical</h3><h3 class="text-xl font-semibold mt-8 mb-4 text-foreground">6.0 Set-theoretic characterizations of truth, meaning, and entailment</h3><p class="document-paragraph mb-4">7.0 Outline of the contents of the sequel to this volume</p><h3 class="text-xl font-semibold mt-8 mb-4 text-foreground">7.1 Function</h3><h3 class="text-xl font-semibold mt-8 mb-4 text-foreground">7.2 Recursive definition</h3><h3 class="text-xl font-semibold mt-8 mb-4 text-foreground">7.3 Cardinals, rationals, and reals</h3><h3 class="text-xl font-semibold mt-8 mb-4 text-foreground">7.4 Formal languages</h3><h3 class="text-xl font-semibold mt-8 mb-4 text-foreground">7.5 Incompleteness</h3><h3 class="text-xl font-semibold mt-8 mb-4 text-foreground">7.6 Axiom-sets in relation to incompleteness</h3><h3 class="text-xl font-semibold mt-8 mb-4 text-foreground">7.7 Compactness vs. continuity</h3><h3 class="text-xl font-semibold mt-8 mb-4 text-foreground">7.8 Set-measure</h3><h3 class="text-xl font-semibold mt-8 mb-4 text-foreground">7.9 Nil vs. infinitesimal</h3><h3 class="text-xl font-semibold mt-8 mb-4 text-foreground">7.10 Dimensionality</h3><h3 class="text-xl font-semibold mt-8 mb-4 text-foreground">1.0 The concept of an inference</h3><p class="document-paragraph mb-4">To make an inference is to form a new belief on the basis of an old one. Here</p><p class="document-paragraph mb-4">is an example. My friend Larry has been evicted from his apartment. I let him</p><p class="document-paragraph mb-4">stay with me until he finds a new place to live. I notice that, shortly after</p><p class="document-paragraph mb-4">Larry moves in, all of my money and valuables start disappearing. I also</p><p class="document-paragraph mb-4">notice that purchases that I didn’t make are appearing on my credit card bills.</p><p class="document-paragraph mb-4">I know that nobody other than Larry had access to my money, valuables, and</p><p class="document-paragraph mb-4">credit cards. So I infer that Larry has stolen my money and valuables and</p><p class="document-paragraph mb-4">illicitly used my credit cards.</p><p class="document-paragraph mb-4">Inferential knowledge is indirect knowledge. Non-inferential knowledge is</p><p class="document-paragraph mb-4">direct knowledge. There is some reason to believe that all knowledge is</p><p class="document-paragraph mb-4">inferential. (This issue is discussed in Section 5.) In any case, it’s clear that</p><p class="document-paragraph mb-4">some knowledge is relatively direct. My knowledge that I am now typing on</p><p class="document-paragraph mb-4">a keyboard is more direct than my knowledge that heat is molecular motion.</p><h3 class="text-xl font-semibold mt-8 mb-4 text-foreground">1.1 Inductive inference vs. deductive inference</h3><p class="document-paragraph mb-4">A premise is a belief that one either has or is willing to accept for</p><p class="document-paragraph mb-4">argument’s sake. An inference always begins with certain premises and ends</p><p class="document-paragraph mb-4">with a conclusion that one accepts on the basis of those premises. An</p><p class="document-paragraph mb-4">inference is legitimate if the premises warrants acceptance of the conclusion.</p><p class="document-paragraph mb-4">There are two very different reasons why acceptance of P might warrant</p><p class="document-paragraph mb-4">acceptance of Q. On the one hand, it might be impossible, for reasons of a</p><p class="document-paragraph mb-4">strictly logical nature, that Q should be false if P is true. (P: Smith owns 127</p><p class="document-paragraph mb-4">cars. Q: Smith owns more than 100 cars.) On the other hand, it might be</p><p class="document-paragraph mb-4">unlikely, but not impossible, that Q should be false if P is true. (P: Smith</p><p class="document-paragraph mb-4">owns 127 cars. Q: Smith is very wealthy.)</p><p class="document-paragraph mb-4">P entails Q if it is logically impossible that Q should be false if P is true.</p><p class="document-paragraph mb-4">P confirms Q if P increases the likelihood that Q is true.</p><p class="document-paragraph mb-4">Given only that P confirms Q, it doesn't follow that acceptance of P</p><p class="document-paragraph mb-4">warrants acceptance of Q. Smith is more likely to find a cure for cancer if he</p><p class="document-paragraph mb-4">is intelligent than if he is unintelligent, and</p><p class="document-paragraph mb-4">P: Smith is intelligent</p><p class="document-paragraph mb-4">therefore confirms</p><p class="document-paragraph mb-4">Q: Smith will find a cure for cancer.</p><p class="document-paragraph mb-4">But acceptance of P obviously doesn't warrant acceptance of Q, since Q is</p><p class="document-paragraph mb-4">more likely than not to be false even if P is true.</p><p class="document-paragraph mb-4">By the same token, P does warrant acceptance of</p><p class="document-paragraph mb-4">R: Smith has not had more than 10 massive strokes,</p><p class="document-paragraph mb-4">given that that, if P is true, there is only a small chance that R is false.</p><h3 class="text-xl font-semibold mt-8 mb-4 text-foreground">1.2 Deduction in relation to entailment</h3><p class="document-paragraph mb-4">If P entails Q, then Q can be deduced from P. If a given person knows that P</p><p class="document-paragraph mb-4">entails Q and on that basis infers Q</p><p class="document-paragraph mb-4">P: x is a square.</p><p class="document-paragraph mb-4">Q: x has more than two sides.</p><p class="document-paragraph mb-4">It is impossible for Q to be false if P is true. Therefore, P entails Q.</p><p class="document-paragraph mb-4">Given only that P entails Q, it doesn’t follow that, if one infers Q from P,</p><p class="document-paragraph mb-4">one is thereby making a legitimate inference.</p><p class="document-paragraph mb-4">If Smith knows that P is true and Smith correctly believes that P entails Q,</p><p class="document-paragraph mb-4">Smith’s inference does not yield knowledge of Q unless Smith’s reason for</p><p class="document-paragraph mb-4">believing that P entails Q is the right one. If Smith believes that squares have</p><p class="document-paragraph mb-4">90 sides and for that reason infers Q from P, Smith has not made a legitimate</p><p class="document-paragraph mb-4">inference, it being a coincidence that he arrived at the right conclusion.</p><h3 class="text-xl font-semibold mt-8 mb-4 text-foreground">1.3 Induction in relation to confirmation</h3><p class="document-paragraph mb-4">P confirms Q if the probability of Q, given P, is higher than the probability of</p><p class="document-paragraph mb-4">Q, given not-P. Equivalently, P confirms Q if P, if true, raises the probability</p><p class="document-paragraph mb-4">of Q without giving Q a probability of 100%.</p><p class="document-paragraph mb-4">It follows that a sufficient condition for P’s confirming Q is that Q be</p><p class="document-paragraph mb-4">capable of being legitimately inductively inferred from P:</p><p class="document-paragraph mb-4">P: Smith drives a Rolls Royce, wears extremely expensive clothes, has</p><p class="document-paragraph mb-4">an excellent credit rating, has an excellent employment history, all of</p><p class="document-paragraph mb-4">his jobs being extremely lucrative ones; and, finally, Smith has no</p><p class="document-paragraph mb-4">criminal record.</p><p class="document-paragraph mb-4">Q: Smith is wealthy.</p><p class="document-paragraph mb-4">P, if true, makes it sufficiently improbable that Q is false that we may infer</p><p class="document-paragraph mb-4">Q from P. Such an inference is not deductive, given that Smith might be an</p><p class="document-paragraph mb-4">extraordinarily talented but penniless con-artist.</p><p class="document-paragraph mb-4">Even though Q’s being capable of being legitimately inductively inferred</p><p class="document-paragraph mb-4">from P is sufficient for P’s confirming Q, it is not necessary for it.</p><p class="document-paragraph mb-4">P: Smith is the most intellectually gifted person in Russia.</p><p class="document-paragraph mb-4">Q: Smith will find a cure for cancer.</p><p class="document-paragraph mb-4">P raises the probability of Q, whereas not-P lowers the probability of Q.</p><p class="document-paragraph mb-4">Thus, P confirms Q, even though by does not by itself warrant acceptance of</p><p class="document-paragraph mb-4">Q.</p><p class="document-paragraph mb-4">True statements can confirm false ones, but they cannot entail them.</p><p class="document-paragraph mb-4">Smith’s fingerprints are on the murder weapon, though true, confirms the</p><p class="document-paragraph mb-4">falsehood that Smith is the murderer. But Smith’s fingerprints are on the</p><p class="document-paragraph mb-4">murder weapon does not entail Smith is the murderer.</p><p class="document-paragraph mb-4">If P entails Q, Q is a logical consequence of P.</p><p class="document-paragraph mb-4">Thus, if P is true, no falsehood is a logical consequence of P.</p><p class="document-paragraph mb-4">At the same time, if Q is true, it is a logical consequence of some</p><p class="document-paragraph mb-4">falsehood P:</p><p class="document-paragraph mb-4">P: Smith’s fingerprints are on every weapon in existence entails the truth</p><p class="document-paragraph mb-4">that</p><p class="document-paragraph mb-4">Q: Smith’s fingerprints are on the murder weapon.</p><p class="document-paragraph mb-4">Indeed, given any true proposition Q, there are infinitely many falsehoods</p><p class="document-paragraph mb-4">P such that Q is a logical consequence of P.</p><p class="document-paragraph mb-4">P1: Either Smith’s fingerprints are on every weapon in existence or 1+2=1.</p><p class="document-paragraph mb-4">P2: Either Smith’s fingerprints are on every weapon in existence or 1+2=1.</p><p class="document-paragraph mb-4">P3: Either Smith’s fingerprints are on every weapon in existence or 1+3=1.</p><p class="document-paragraph mb-4">.</p><p class="document-paragraph mb-4">.</p><p class="document-paragraph mb-4">.</p><p class="document-paragraph mb-4">Pn: Either Smith’s fingerprints are on every weapon in existence or 1+n=1</p><p class="document-paragraph mb-4">.</p><p class="document-paragraph mb-4">.</p><p class="document-paragraph mb-4">.</p><p class="document-paragraph mb-4">Q is a logical consequence of Pi, for any i≥1.</p><h3 class="text-xl font-semibold mt-8 mb-4 text-foreground">1.4 Validity vs. soundness</h3><p class="document-paragraph mb-4">A valid argument is a deductive argument whose premises, if true, in fact</p><p class="document-paragraph mb-4">give a probability of 100% to the conclusion. In other words, a valid</p><p class="document-paragraph mb-4">argument is an argument whose premises are supposed to give 100%</p><p class="document-paragraph mb-4">probability to the conclusion and whose premises in fact give 100%</p><p class="document-paragraph mb-4">probability to the conclusion.</p><p class="document-paragraph mb-4">A valid argument can have false premises. For an argument to be valid it is</p><p class="document-paragraph mb-4">necessary only that if the premises were true, then there would be a 100%</p><p class="document-paragraph mb-4">chance that the conclusion is true. It may be that Smith doesn’t drive a Rolls</p><p class="document-paragraph mb-4">Royce or any kind of car for that matter. But it’s still the case that if Smith</p><p class="document-paragraph mb-4">did drive a Rolls Royce, then, given that all Rolls Royces are cars, there</p><p class="document-paragraph mb-4">would be no chance that Smith didn’t drive a car.</p><p class="document-paragraph mb-4">A sound argument is a valid argument with true premises. (For example:</p><p class="document-paragraph mb-4">JMK is a human; all humans are mammals; therefore, JMK is a mammal.)</p><p class="document-paragraph mb-4">A valid argument cannot possibly have true premises and a false</p><p class="document-paragraph mb-4">conclusion, but it can have false premises and a false conclusion or false</p><p class="document-paragraph mb-4">premises and a true conclusion.</p><h3 class="text-xl font-semibold mt-8 mb-4 text-foreground">1.5 Two kinds of induction</h3><p class="document-paragraph mb-4">There are two kinds of inductive inference: induction by enumeration and</p><p class="document-paragraph mb-4">inference to the best explanation.</p><p class="document-paragraph mb-4">If, on the basis of the fact that you know of many x’s that are y’s and of no</p><p class="document-paragraph mb-4">x’s that aren’t y’s, you infer that all x’s are y’s or that the next x you</p><p class="document-paragraph mb-4">encounter is a y, you’ve performed a case of induction by enumeration.</p><p class="document-paragraph mb-4">Here is an example. You’ve seen a million swans. They were all white.</p><p class="document-paragraph mb-4">(Moreover, you knew in each case that what you were seeing was a white</p><p class="document-paragraph mb-4">swan—you didn’t think it was, for example, a beige duck.) You’ve never</p><p class="document-paragraph mb-4">seen, or otherwise come to know of, any non-white swan. On this basis, you</p><p class="document-paragraph mb-4">infer that all swans are white and, therefore, that, if you ever encounter</p><p class="document-paragraph mb-4">another swan, it will be white.</p><p class="document-paragraph mb-4">If, in order to account for something of which you have knowledge, you</p><p class="document-paragraph mb-4">posit the existence of something of which you don’t have knowledge; you</p><p class="document-paragraph mb-4">have made an inference to the best explanation.</p><p class="document-paragraph mb-4">All theories are cases of inference to the best explanation. All the theories</p><p class="document-paragraph mb-4">put forth by Einstein, Darwin, Freud are instances of this mode of inference.</p><p class="document-paragraph mb-4">Inference to the best explanation is a very powerful form of inference. (In</p><p class="document-paragraph mb-4">fact, we will see in Section 1.7. that it is the only form of non-deductive</p><p class="document-paragraph mb-4">inference. So-called “induction by enumeration,” to the extent that it isn’t a</p><p class="document-paragraph mb-4">spurious method of inference, collapses into inference to the best</p><p class="document-paragraph mb-4">explanation.)</p><p class="document-paragraph mb-4">The conclusions of inferences to the best explanation are always causal</p><p class="document-paragraph mb-4">statements. You posit the existence of X, which you don’t know of, in order</p><p class="document-paragraph mb-4">to explain Y, which you do know of, because, in your judgment, X, if it</p><p class="document-paragraph mb-4">existed, would cause Y to occur.</p><p class="document-paragraph mb-4">Example #3 is a case of inference to the best explanation. I infer that Larry</p><p class="document-paragraph mb-4">stole my credit cards (etc.) because the relevant data is easy to explain on the</p><p class="document-paragraph mb-4">assumption that he did, the reason being that his doing so would have</p><p class="document-paragraph mb-4">generated that data, and hard to explain on the assumption that he didn’t, the</p><p class="document-paragraph mb-4">reason being that it’s unclear what else could have generated that data.</p><p class="document-paragraph mb-4">To take another example: if you infer that a mouse has been eating the</p><p class="document-paragraph mb-4">cheese in your cupboard, it’s because a mouse’s doing so would have</p><p class="document-paragraph mb-4">generated the relevant data (e.g., the tiny little footprints inside the cupboard),</p><p class="document-paragraph mb-4">and it’s not clear what else could have generated that data.</p><p class="document-paragraph mb-4">In some cases, the conclusions of inferences to the best explanation aren’t</p><p class="document-paragraph mb-4">themselves causal statements. Our knowledge that water consists of H2O</p><p class="document-paragraph mb-4">molecules isn’t itself a causal statement. Cause-effect relations hold between</p><p class="document-paragraph mb-4">distinct entities (e.g., thunder and lightning). Water and H2O aren’t distinct.</p><p class="document-paragraph mb-4">That said, it is believed that water consists of H2O molecules only because</p><p class="document-paragraph mb-4">its being so composed would cause various things to happen that do in fact</p><p class="document-paragraph mb-4">happen. So even though the conclusion of an inference to the best explanation</p><p class="document-paragraph mb-4">need not itself be a causal statement, all inferences to the best explanation are</p><p class="document-paragraph mb-4">causal inferences.</p><h3 class="text-xl font-semibold mt-8 mb-4 text-foreground">1.6 A fact about induction by enumeration</h3><p class="document-paragraph mb-4">Induction by enumeration isn’t nearly as powerful a form of inference as</p><p class="document-paragraph mb-4">inference to the best explanation. Given only that every single one of the</p><p class="document-paragraph mb-4">5,000 first editions you’ve ever come across smelled like pipe tobacco, you</p><p class="document-paragraph mb-4">cannot reasonably infer that all first editions smell like pipe tobacco. What if</p><p class="document-paragraph mb-4">all of those first editions were the property of your pipe-smoking friend</p><p class="document-paragraph mb-4">Larry? In that case, you’d have good to reason to suspect that their smelling</p><p class="document-paragraph mb-4">like pipe tobacco had to do, not with their being first editions, but with their</p><p class="document-paragraph mb-4">being things that had been around Larry.</p><p class="document-paragraph mb-4">By the same token, so far as you are entitled to infer that all first editions</p><p class="document-paragraph mb-4">smell like pipe tobacco, it’s only to the extent that you have reason to believe</p><p class="document-paragraph mb-4">that a thing’s smelling like pipe tobacco is rooted in its being a first edition.</p><p class="document-paragraph mb-4">But that means that, if the data entitles you to infer that all first editions smell</p><p class="document-paragraph mb-4">like pipe tobacco, it’s only because it also entitles you to accept some</p><p class="document-paragraph mb-4">inference to the best explanation (one to the effect that a thing’s being a first</p><p class="document-paragraph mb-4">edition is, for some reason or other, responsible for its smelling like pipe</p><p class="document-paragraph mb-4">tobacco).</p><p class="document-paragraph mb-4">In general, induction by enumeration is parasitic on inference to the best</p><p class="document-paragraph mb-4">explanation. In Chapter 12 of Analytic Philosophy, it is shown how a failure</p><p class="document-paragraph mb-4">to see this underlies the spurious belief that there is no non-deductive,</p><p class="document-paragraph mb-4">inferential knowledge.</p><h3 class="text-xl font-semibold mt-8 mb-4 text-foreground">1.7 Two kinds of entailment</h3><p class="document-paragraph mb-4">Just as there are two kinds of inductive inference, so there are two kinds of</p><p class="document-paragraph mb-4">deductive inference. In other words, there are two kinds of entailment: formal</p><p class="document-paragraph mb-4">entailment and informal entailment.</p><p class="document-paragraph mb-4">An entailment is “informal” if the syntactic structures of the sentences</p><p class="document-paragraph mb-4">involved are not what make the entailment go through. Consider the</p><p class="document-paragraph mb-4">following entailment:</p><p class="document-paragraph mb-4"># If Smith is tall and Jones snores, then Smith is tall.</p><p class="document-paragraph mb-4">This sentence has the form:</p><p class="document-paragraph mb-4">If P and Q, then P.</p><p class="document-paragraph mb-4">If a sentence has that form, it constitutes a valid inference. So # is made true</p><p class="document-paragraph mb-4">by its form—that is, by its syntax.</p><p class="document-paragraph mb-4">But not all valid entailments hold in virtue of syntax. In fact, most do not.</p><p class="document-paragraph mb-4">Consider the sentence:</p><p class="document-paragraph mb-4">^ If Smith weighs 1000 pounds, and Jones weighs 80 pounds, then</p><p class="document-paragraph mb-4">Smith weighs more than Jones.</p><p class="document-paragraph mb-4">Obviously ^ is valid. But its syntax isn’t what makes it true, since that</p><p class="document-paragraph mb-4">sentence has the same syntax as:</p><p class="document-paragraph mb-4">^^ If Smith weighs 80 pounds, and Jones weighs 1000 pounds,</p><p class="document-paragraph mb-4">then Smith weighs more than Jones,</p><p class="document-paragraph mb-4">which is obviously invalid.</p><h3 class="text-xl font-semibold mt-8 mb-4 text-foreground">2.0 Some notational conventions relevant to formal logic</h3><p class="document-paragraph mb-4">Statements of the form “if P, then Q” are known as “conditionals.” The</p><p class="document-paragraph mb-4">expression “→” stands for “if...then.” So “P→Q” means “if P, then Q.” Thus,</p><p class="document-paragraph mb-4">(1) Smith has four cars→Smith has more than one car</p><p class="document-paragraph mb-4">means that</p><p class="document-paragraph mb-4">(2) If Smith has four cars, then Smith has more than one car.</p><p class="document-paragraph mb-4">Thus, “P→Q” can be taken to mean that P implies Q. Thus “→” expresses</p><p class="document-paragraph mb-4">implication.</p><p class="document-paragraph mb-4">As we will use the expression “→,” the expression “P→Q” means that P</p><p class="document-paragraph mb-4">entails Q, i.e., that it is impossible for P to be true if Q is false. In other</p><p class="document-paragraph mb-4">words, “→” expresses what is sometimes referred to as strict entailment. (P</p><p class="document-paragraph mb-4">strictly entails Q if, supposing that P is true, there is no way that Q can be</p><p class="document-paragraph mb-4">false. In this work, “entailment” and “strict entailment” are synonymous</p><p class="document-paragraph mb-4">expressions.)</p><p class="document-paragraph mb-4">This isn’t how “→” is typically used. It is typically used to express a much</p><p class="document-paragraph mb-4">weaker notion known as material implication. This term is defined below.</p><p class="document-paragraph mb-4">Biconditionals and “↔”</p><p class="document-paragraph mb-4">Statements of the form “if P then Q, and if Q then P” are known as</p><p class="document-paragraph mb-4">“biconditionals.” When stated in non-artificial notation, “if P then Q, and if Q</p><p class="document-paragraph mb-4">then P” is typically compressed into “P iff Q” (or “P just in case Q” or “P</p><p class="document-paragraph mb-4">exactly if Q”). We’ll compress it into: “P↔Q.” So “Smith is a father↔Smith</p><p class="document-paragraph mb-4">is a male parent” says the same thing as “Smith is a father iff Smith is a male</p><p class="document-paragraph mb-4">parent.”</p><p class="document-paragraph mb-4">Parentheses as indicators of scope</p><p class="document-paragraph mb-4">Parentheses are used to indicate how sentences are to be grouped together.</p><p class="document-paragraph mb-4">Consider the sentence:</p><p class="document-paragraph mb-4">(3) “snow is white and grass is green→grass is green.”</p><p class="document-paragraph mb-4">(3) is ambiguous between:</p><p class="document-paragraph mb-4">(4) it’s the case that snow is white; and it’s also the case that, if grass is</p><p class="document-paragraph mb-4">green, then grass is green</p><p class="document-paragraph mb-4">and</p><p class="document-paragraph mb-4">(5) supposing that it’s the case that snow is white and that grass is green,</p><p class="document-paragraph mb-4">it follows that grass is green.</p><p class="document-paragraph mb-4">(4) and (5) have different meanings. (5) doesn’t say that snow is white. Nor</p><p class="document-paragraph mb-4">does it say that grass is green. It says that if it’s the case that both grass is</p><p class="document-paragraph mb-4">green and snow is white, then it’s also the case that grass is green. (4), on the</p><p class="document-paragraph mb-4">other hand, says (among other things) that snow is white. So (4) is false in</p><p class="document-paragraph mb-4">universes where snow is green. But (5) is true in such universes. (In fact, (5)</p><p class="document-paragraph mb-4">is true in every possible universe.) Since there are circumstances where (4) is</p><p class="document-paragraph mb-4">false but (5) is true, they don’t have the same meanings.</p><p class="document-paragraph mb-4">Modern symbolic logic gives us a way of avoiding the laborious ad hoc</p><p class="document-paragraph mb-4">methods just used to disambiguate (3). To express (4), we say:</p><p class="document-paragraph mb-4">(3.4) snow is white and (grass is green→grass is green).</p><p class="document-paragraph mb-4">And to express (5), we say:</p><p class="document-paragraph mb-4">(3.5) (snow is white and grass is green)→grass is green.</p><p class="document-paragraph mb-4">In general, any two co-parenthetical sentences are more tightly bonded to</p><p class="document-paragraph mb-4">each other than either is to anything that isn’t co-parenthetical with those</p><p class="document-paragraph mb-4">sentences.</p><p class="document-paragraph mb-4">Negation</p><p class="document-paragraph mb-4">~P is the negation of P. Thus,</p><p class="document-paragraph mb-4">“~(snow is not white)”</p><p class="document-paragraph mb-4">is the negation of</p><p class="document-paragraph mb-4">“snow is white.”</p><p class="document-paragraph mb-4">This means that</p><p class="document-paragraph mb-4">“~(snow is not white)”</p><p class="document-paragraph mb-4">is meaning-equivalent with</p><p class="document-paragraph mb-4">“it is not the case that snow is white.”</p><p class="document-paragraph mb-4">Be it noted that</p><p class="document-paragraph mb-4">“~(snow is not white)”</p><p class="document-paragraph mb-4">does not say that snow is black. Nor does it say that snow is green. It says</p><p class="document-paragraph mb-4">only that snow isn’t white; everything else is left open.</p><p class="document-paragraph mb-4">In general, the negation of a sentence isn’t the same thing as the “opposite”</p><p class="document-paragraph mb-4">of that sentence. In modern logic, the word “opposite” has no meaning. The</p><p class="document-paragraph mb-4">use of the “~” makes it easy to negate statements that would otherwise be</p><p class="document-paragraph mb-4">hard to negate without prejudging important issues or using cumbersome</p><p class="document-paragraph mb-4">constructions. Consider the sentence:</p><p class="document-paragraph mb-4">(%) If John likes to listen to Mozart, then Larry likes</p><p class="document-paragraph mb-4">to listen to Brahms or the sky is blue.</p><p class="document-paragraph mb-4">In natural language one way to negate (%) is to put the expression “it is not</p><p class="document-paragraph mb-4">the case that’’ in front of it. The result of this operation is:</p><p class="document-paragraph mb-4">(%1) “it is not the case that if John likes to listen to</p><p class="document-paragraph mb-4">Mozart, then Larry likes to listen to Brahms or the sky</p><p class="document-paragraph mb-4">is blue.”</p><p class="document-paragraph mb-4">But there’s a problem. (%1) is ambiguous, as it could mean either:</p><p class="document-paragraph mb-4">(%2) either the sky is blue or it is not the case Larry likes to listen to</p><p class="document-paragraph mb-4">Brahms if John likes to listen to Mozart</p><p class="document-paragraph mb-4">or</p><p class="document-paragraph mb-4">(%3) it isn’t the case that the sky is blue; nor is it the</p><p class="document-paragraph mb-4">case that Larry likes to listen to Brahms if John likes to</p><p class="document-paragraph mb-4">listen to Mozart.</p><p class="document-paragraph mb-4">It takes work to come up with each of these two sentences. Each of the</p><p class="document-paragraph mb-4">original two sentences had to be reparsed; and in each case this reparsing</p><p class="document-paragraph mb-4">involved the use of methods that, being ad hoc, could be arrived at only</p><p class="document-paragraph mb-4">through a creative insight and logical inference. Such Herculean measures</p><p class="document-paragraph mb-4">shouldn’t have been necessary, given that the objective was only to perform a</p><p class="document-paragraph mb-4">purely grammatical operation.</p><p class="document-paragraph mb-4">This problem doesn’t arise in our special symbolic notation. % can be</p><p class="document-paragraph mb-4">unambiguously disambiguated in a mechanical, thought-free manner. One</p><p class="document-paragraph mb-4">need only put a ‘~’ before % and then enclose the part one wants negated in</p><p class="document-paragraph mb-4">parentheses. Thus, the symbolic analogue of:</p><p class="document-paragraph mb-4">(%2S) ~(Larry likes to listen to Brahms if John likes to listen to Mozart) or</p><p class="document-paragraph mb-4">the sky is blue;</p><p class="document-paragraph mb-4">and the symbolic analogue of (%3) is:</p><p class="document-paragraph mb-4">(%3S) ~(either the sky is blue or (Larry likes to listen to Brahms if John</p><p class="document-paragraph mb-4">likes to listen to Mozart)).</p><p class="document-paragraph mb-4">In (%3S), the scope of the negation-sign is % in its entirety. (Were it not for</p><p class="document-paragraph mb-4">the parentheses immediately flanking its second disjunct, (%3S) would be</p><p class="document-paragraph mb-4">ambiguous between a conditional whose consequent was a disjunction and a</p><p class="document-paragraph mb-4">disjunction one of whose disjuncts was a conditional.) In (%2S), the scope of</p><p class="document-paragraph mb-4">the negation-sign is confined to the sentence “if John likes to listen to Mozart,</p><p class="document-paragraph mb-4">then Larry likes to listen to Brahms.”</p><p class="document-paragraph mb-4">Thus, in our symbolic notation, parentheses are used is to make it clear</p><p class="document-paragraph mb-4">how much scope is to be given to a given operator. An “operator” is an</p><p class="document-paragraph mb-4">expression that, given one or more sentences, yields a new sentence.</p><p class="document-paragraph mb-4">Examples of operators are: “it is not the case that,” “or,” “and,” “because,” “it</p><p class="document-paragraph mb-4">is possible that,” and “Fred believes that.”</p><p class="document-paragraph mb-4">“Fred believes that” is an operator because, when given the sentence</p><p class="document-paragraph mb-4">“snow is white,” it yields a new sentence, namely: “Fred believes that snow is</p><p class="document-paragraph mb-4">white.” “And” is an operator because, when given the sentences “snow is</p><p class="document-paragraph mb-4">white” and “grass is green,” it yields the sentence “snow is white and grass is</p><p class="document-paragraph mb-4">green.” “Because” is an operator for the same reason mutatis mutandis.</p><p class="document-paragraph mb-4">(Since “snow is white because grass is green” has a very different meaning</p><p class="document-paragraph mb-4">from “grass is green because snow is white,” “because” operates on ordered</p><p class="document-paragraph mb-4">pairs of sentences.)</p><p class="document-paragraph mb-4">When an operator O occurs in some sentence S, where S has one or more</p><p class="document-paragraph mb-4">sentences as proper parts, the scope of that occurrence is identical with the set</p><p class="document-paragraph mb-4">of sentences thereby combined into a single sentence.</p><p class="document-paragraph mb-4">Consider the sentence:</p><p class="document-paragraph mb-4">(i) “Jim is tired because he went jogging and his wife Sally is a very</p><p class="document-paragraph mb-4">demanding person.”</p><p class="document-paragraph mb-4">This is ambiguous. It could mean either:</p><p class="document-paragraph mb-4">(ii) Jim’s wife Sally is a very demanding person; moreover, Jim is tired</p><p class="document-paragraph mb-4">because he went jogging</p><p class="document-paragraph mb-4">or</p><p class="document-paragraph mb-4">(iii) There are two reasons why Jim is tired: first he went jogging; second,</p><p class="document-paragraph mb-4">Jim’s wife Sally is a very demanding person.</p><p class="document-paragraph mb-4">Thus, in English (or any other natural language), use of the expression</p><p class="document-paragraph mb-4">“because” may yield a sentence that is ambiguous and, in addition, can be</p><p class="document-paragraph mb-4">disambiguated only by successfully doing a certain amount of syntax-</p><p class="document-paragraph mb-4">chopping and, therefore, logic-chopping.</p><p class="document-paragraph mb-4">But in our symbolic notation, one can disambiguate (i) without having to</p><p class="document-paragraph mb-4">do any logic-chopping. One need only put parentheses around the two</p><p class="document-paragraph mb-4">sentences that one wants joined by the “because.” Thus, the symbolic</p><p class="document-paragraph mb-4">analogue of (ii) is:</p><p class="document-paragraph mb-4">(iiS) (Jim is tired because he went jogging) and Sally is a very demanding</p><p class="document-paragraph mb-4">person.</p><p class="document-paragraph mb-4">And the symbolic analogue of (iii) is:</p><p class="document-paragraph mb-4">(iiiS) Jim is tired because (he went jogging and Sally is a very demanding</p><p class="document-paragraph mb-4">person).</p><p class="document-paragraph mb-4">Negation in relation to the use of parentheses</p><p class="document-paragraph mb-4">Parentheses make it clear what is being negated. For example,</p><p class="document-paragraph mb-4">(A) ~snow is white or grass is green</p><p class="document-paragraph mb-4">is ambiguous. It could mean either</p><p class="document-paragraph mb-4">(B) Either it’s the case that grass is green or it’s the case that snow isn’t</p><p class="document-paragraph mb-4">white</p><p class="document-paragraph mb-4">or</p><p class="document-paragraph mb-4">(C) it isn’t the case that (snow is white or grass is green).</p><p class="document-paragraph mb-4">(C) is equivalent with:</p><p class="document-paragraph mb-4">(D) snow isn’t white and grass isn’t green.</p><p class="document-paragraph mb-4">(B) isn’t equivalent with (D), since (B), unlike (D), is true in a world where</p><p class="document-paragraph mb-4">grass is green.</p><p class="document-paragraph mb-4">(A1) ~(snow is white or grass is green)</p><p class="document-paragraph mb-4">says the same thing as (C), and</p><p class="document-paragraph mb-4">(A2) ~(snow is white) or grass is green</p><p class="document-paragraph mb-4">says the same thing as (B).</p><p class="document-paragraph mb-4">Thus, parentheses make it clear how much scope a given occurrence of</p><p class="document-paragraph mb-4">“~” has—that is, they make it clear how much it is negating.</p><p class="document-paragraph mb-4">The modal operators—the box and the pound sign</p><p class="document-paragraph mb-4">“□P” means “necessarily P” and “#P” means “possibly P.”</p><p class="document-paragraph mb-4">Typically, the possibility-operator is a diamond, not a pound sign, but this</p><p class="document-paragraph mb-4">publication software doesn’t support use of the diamond.</p><p class="document-paragraph mb-4">Note concerning the modal operators: The box and the pound sign are to</p><p class="document-paragraph mb-4">be given minimal scope. So “□P→Q” is not to mean that it’s necessarily the</p><p class="document-paragraph mb-4">case that P implies Q. Rather, it is to mean that, if it’s necessarily true that P</p><p class="document-paragraph mb-4">is the case, then it follows that Q is the case. “□(P→Q),” on the other hand,</p><p class="document-paragraph mb-4">does say that it’s necessarily the case that P implies Q.</p><p class="document-paragraph mb-4">The non-exclusive meaning of “or”</p><p class="document-paragraph mb-4">We’ll use “or” in the non-exclusive sense. So, as we’ll be using it “either</p><p class="document-paragraph mb-4">Smith is having dinner or Smith is in London” is consistent with Smith’s</p><p class="document-paragraph mb-4">being in London while having dinner. In order for “P or Q” to be true, all that</p><p class="document-paragraph mb-4">is necessary is one of those two statements be true. So there are three</p><p class="document-paragraph mb-4">circumstances under which “P or Q” is true:</p><p class="document-paragraph mb-4">(i) P is true and Q is false.</p><p class="document-paragraph mb-4">(ii) Q is true and P is false.</p><p class="document-paragraph mb-4">(iii) P is true and Q is true.</p><p class="document-paragraph mb-4">In contemporary logic, both formal and informal, “or”</p><p class="document-paragraph mb-4">is always used in the non-exclusive sense.</p><p class="document-paragraph mb-4">“Unless”</p><p class="document-paragraph mb-4">(a) We work unless it is raining</p><p class="document-paragraph mb-4">is equivalent with</p><p class="document-paragraph mb-4">(b) If we aren’t working, it’s raining.</p><p class="document-paragraph mb-4">In general,</p><p class="document-paragraph mb-4">(A) P unless Q</p><p class="document-paragraph mb-4">means</p><p class="document-paragraph mb-4">(B) ~P→Q</p><p class="document-paragraph mb-4">The Sheffer Stroke</p><p class="document-paragraph mb-4">“/” is  a logical operator known as the “Sheffer Stroke.” The Sheffer Stroke</p><p class="document-paragraph mb-4">is defined thus:</p><p class="document-paragraph mb-4">P/Q≡DF~P and ~Q</p><p class="document-paragraph mb-4">Hence the following theorems:</p><p class="document-paragraph mb-4">~P↔P/P</p><p class="document-paragraph mb-4">P↔(P/P)/(P/P)</p><p class="document-paragraph mb-4">(P and Q) ↔(P/P)/(Q/Q)</p><p class="document-paragraph mb-4">(P or Q)↔(P/Q)/(P/Q)</p><p class="document-paragraph mb-4">Compatibility and incompatibility</p><p class="document-paragraph mb-4">Statements are compatible when neither entails the negation of the other.</p><p class="document-paragraph mb-4">Statements are incompatible when the one entails the negation of the other. P</p><p class="document-paragraph mb-4">entails Q just in case P is incompatible with ~Q.</p><h3 class="text-xl font-semibold mt-8 mb-4 text-foreground">2.1 Some general principles relevant to formal logic</h3><p class="document-paragraph mb-4">Deduction is truth-preserving: A true statement cannot entail a false one. In</p><p class="document-paragraph mb-4">other words, a false statement cannot be validly inferred from a true one.</p><p class="document-paragraph mb-4">Deduction is transitive (a corollary of the fact that it’s truth-preserving): R</p><p class="document-paragraph mb-4">is a transitive relation if, supposing that x bears to R to y and y bears R to z,</p><p class="document-paragraph mb-4">then x bears R to z. The relation of being less tall than is transitive. So is the</p><p class="document-paragraph mb-4">relation of logical-consequence. Therefore, deduction is transitive. A</p><p class="document-paragraph mb-4">statement entails anything entailed by any one of its consequences. For</p><p class="document-paragraph mb-4">example:</p><p class="document-paragraph mb-4">If Smith is an elephant, then Smith is a mammal.</p><p class="document-paragraph mb-4">If Smith is a mammal, then Smith has hair.</p><p class="document-paragraph mb-4">Therefore, if Smith is an elephant, then Smith has hair.</p><p class="document-paragraph mb-4">Induction isn’t truth-preserving: A true statement may confirm a false one.</p><p class="document-paragraph mb-4">For practically any value of “x”, the statement</p><p class="document-paragraph mb-4">P: x is a heavy smoker</p><p class="document-paragraph mb-4">certainly confirms</p><p class="document-paragraph mb-4">Q: x won’t live to be a hundred.</p><p class="document-paragraph mb-4">But for some values of x, P is true and Q is false, as there have been heavy</p><p class="document-paragraph mb-4">smokers who lived to be a 100.</p><p class="document-paragraph mb-4">Commentary: This principle is a simple of corollary of the fact that</p><p class="document-paragraph mb-4">multiplying n by a proper fraction yields a number m<n. The same is true of</p><p class="document-paragraph mb-4">the next principle.</p><p class="document-paragraph mb-4">Induction isn’t transitive: A corollary of the non-truth-preserving character</p><p class="document-paragraph mb-4">of induction is that induction is not transitive. In other words, given only that</p><p class="document-paragraph mb-4">P confirms Q and that Q confirms R, it doesn’t follow that P confirms R:</p><p class="document-paragraph mb-4">P: Smith is a morbidly obese man with a heart condition and terminal</p><p class="document-paragraph mb-4">cancer who is due to be executed in five hours.</p><p class="document-paragraph mb-4">Q: Smith is a morbidly obese man with a heart condition and terminal</p><p class="document-paragraph mb-4">cancer who is going to die soon.</p><p class="document-paragraph mb-4">R: Smith will soon die of some ailment related to his obesity, his heart-</p><p class="document-paragraph mb-4">condition, or his cancer.</p><p class="document-paragraph mb-4">P confirms Q; Q confirms R. But P doesn’t confirm R. P makes it a veritable</p><p class="document-paragraph mb-4">certainty that Smith will be executed in five hours and, therefore, that he</p><p class="document-paragraph mb-4">won’t die for reasons having to do with his heart or weight or cancer-</p><p class="document-paragraph mb-4">situation. So P disconfirms R, even though it confirms Q, which, unlike P,</p><p class="document-paragraph mb-4">does confirm R.</p><p class="document-paragraph mb-4">Contraposition, conversion, inversion</p><p class="document-paragraph mb-4">These are operations that are performed on conditional statements (statements</p><p class="document-paragraph mb-4">of the form “if P, then Q”).</p><p class="document-paragraph mb-4">The contrapositive of (P→Q) is (~Q→~P).</p><p class="document-paragraph mb-4">Thus, the contrapositive of</p><p class="document-paragraph mb-4">“If Bob is a dog, then Bob is a mammal”</p><p class="document-paragraph mb-4">is</p><p class="document-paragraph mb-4">“If Bob is not a mammal, then Bob is not a dog.”</p><p class="document-paragraph mb-4">Statements are equivalent with their contrapositives. In other words,</p><p class="document-paragraph mb-4">(P→Q)↔(~Q→~P). Bob’s being a dog entails his being a mammal iff his</p><p class="document-paragraph mb-4">being a non-mammal entails his being a non-dog.</p><p class="document-paragraph mb-4">The converse of (P→Q) is (Q→P). Thus, the converse of</p><p class="document-paragraph mb-4">“If Bob is a human, then Bob is a mammal”</p><p class="document-paragraph mb-4">is</p><p class="document-paragraph mb-4">“If Bob is a mammal, then Bob is human.”</p><p class="document-paragraph mb-4">As this example shows, statements are not generally equivalent with their</p><p class="document-paragraph mb-4">converses. It’s only when both antecedent and consequent are equivalent that</p><p class="document-paragraph mb-4">a given conditional is equivalent with its converse. (In (P→Q), P is the</p><p class="document-paragraph mb-4">antecedent and Q is the consequent.) Thus, the converse of</p><p class="document-paragraph mb-4">“If Bob is a father then Bob is a male parent is true”</p><p class="document-paragraph mb-4">is true, since antecedent and consequence are equivalent.</p><p class="document-paragraph mb-4">The inverse of (P→Q) is (not-P→not-Q). Thus, the inverse of</p><p class="document-paragraph mb-4">“If Bob is a human, then Bob is a mammal”</p><p class="document-paragraph mb-4">is</p><p class="document-paragraph mb-4">“if Bob is not a human, then Bob is not a mammal.”</p><p class="document-paragraph mb-4">As this example shows, statements are not generally equivalent with their</p><p class="document-paragraph mb-4">inverses. It’s only when both antecedent and consequent are equivalent that</p><p class="document-paragraph mb-4">conditional is equivalent with its inverse. This is because the converse of a</p><p class="document-paragraph mb-4">proposition is equivalent with its inverse. In other words,</p><p class="document-paragraph mb-4">(Q→P)↔(not-P→not-Q).</p><p class="document-paragraph mb-4">The reason why they’re equivalent is that the second is the contrapositive</p><p class="document-paragraph mb-4">of the first. (As we know, contraposing a conditional produces an equivalent</p><p class="document-paragraph mb-4">conditional.)</p><p class="document-paragraph mb-4">A sentence-level operation is truth-preserving if, when given a true</p><p class="document-paragraph mb-4">sentence as input, it cannot possibly yield a false sentence as output.</p><p class="document-paragraph mb-4">Contraposition is truth-preserving. Conversion and inversion are not.</p><p class="document-paragraph mb-4">Exercise: Prove that, given any conditional sentence S, the contrapositive</p><p class="document-paragraph mb-4">of S is equivalent with S. Further, prove that it is not the case that, given any</p><p class="document-paragraph mb-4">conditional sentence S, the converse of S is equivalent with S. Finally, prove</p><p class="document-paragraph mb-4">that, given any conditional sentence S, the inverse of S is equivalent with the</p><p class="document-paragraph mb-4">converse of S.</p><p class="document-paragraph mb-4">Material vs. strict vs. formal entailment</p><p class="document-paragraph mb-4">Logicians distinguish between “formal” and “material” implication, and</p><p class="document-paragraph mb-4">they distinguish each from “strict” implication. “Strict implication” is</p><p class="document-paragraph mb-4">synonymous with “entailment”, and “strict entailment” is therefore a</p><p class="document-paragraph mb-4">pleonasm.</p><p class="document-paragraph mb-4">P formally entails Q if the sentence ‹if P, then Q› is an instance of an open-</p><p class="document-paragraph mb-4">sentence that is true for all values of its free variables. Thus, a formal truth is</p><p class="document-paragraph mb-4">a truth that is an instance of an open-sentence that is true for all values of its</p><p class="document-paragraph mb-4">free variables. “2 = 2” is a ‘formal’ truth, because it is an instance of the</p><p class="document-paragraph mb-4">open-sentence, namely:</p><p class="document-paragraph mb-4">“x = x”</p><p class="document-paragraph mb-4">which is true for all values of its variables.</p><p class="document-paragraph mb-4">Formal implication is a kind of strict implication. Any case of formal</p><p class="document-paragraph mb-4">implication is a case of strict implication, but not vice versa. The reasons for</p><p class="document-paragraph mb-4">this are given in Analytic Philosophy, Chapters 1, 6, and 18, and also in</p><p class="document-paragraph mb-4">Section 4.5 of the present work.</p><p class="document-paragraph mb-4">“P materially implies Q” is true if any one of the following three</p><p class="document-paragraph mb-4">conditions is met:</p><p class="document-paragraph mb-4">(i) P is false and Q is false;</p><p class="document-paragraph mb-4">(ii) P is false and Q is true;</p><p class="document-paragraph mb-4">(iii) P is true and Q is true.</p><p class="document-paragraph mb-4">It is only if</p><p class="document-paragraph mb-4">(iv) P is true and Q is false</p><p class="document-paragraph mb-4">that P does not materially imply Q.</p><p class="document-paragraph mb-4">If P is any false statement P, and Q is any statement at all, “P is true and Q</p><p class="document-paragraph mb-4">is false” is false. For this reason, any false statement materially implies all</p><p class="document-paragraph mb-4">statements.</p><p class="document-paragraph mb-4">Material implication isn’t a form of implication at all. So, while it’s a fact</p><p class="document-paragraph mb-4">that, for any statement Q, any given falsity “materially implies” Q, that fact is</p><p class="document-paragraph mb-4">an innocuous consequence of a linguistic convention that, although it</p><p class="document-paragraph mb-4">concerns the word “implication,” has nothing to do with implication at all.</p><p class="document-paragraph mb-4">Material and strict entailment may hold between propositions or between</p><p class="document-paragraph mb-4">expressions. But formal entailment holds only among expressions. It is</p><p class="document-paragraph mb-4">typically held to hold among sentence-types. My strongly held view is that it</p><p class="document-paragraph mb-4">holds only among sentence-tokens. (See Chapter 4 of Analytic Philosophy for</p><p class="document-paragraph mb-4">a defense of this claim.) This is the view of Peter Strawson, Jon Barwise, and</p><p class="document-paragraph mb-4">John Perry. But for the sake of brevity we will use the term ‘sentence’ to</p><p class="document-paragraph mb-4">stand for sentence-type and sentence-tokens.</p><p class="document-paragraph mb-4">Modality</p><p class="document-paragraph mb-4">“Modal” means “having to do with necessity or possibility.” Possibility and</p><p class="document-paragraph mb-4">necessity are properties of statements, not objects. Any statement of the form</p><p class="document-paragraph mb-4">□P (‘it’s necessarily the case that P’) or # P (‘it is possible that P’) is a modal</p><p class="document-paragraph mb-4">statement.</p><p class="document-paragraph mb-4">“Necessary” and “possible” are interdefinable. “Necessary” can be defined</p><p class="document-paragraph mb-4">as “not possibly not,” and “possibly” can be defined as “not necessarily not.”</p><p class="document-paragraph mb-4">Thus,</p><p class="document-paragraph mb-4">□P iff ~#~Q.</p><p class="document-paragraph mb-4">Statements that affirm bearing relations, whether deductive or inductive,</p><p class="document-paragraph mb-4">are modal. Thus, causal statements are modal statements, since they have the</p><p class="document-paragraph mb-4">form □(if P, then Q).</p><p class="document-paragraph mb-4">Causal necessity isn’t logical necessity, of course. Given that</p><p class="document-paragraph mb-4">(i) I threw gasoline on the fire,</p><p class="document-paragraph mb-4">it is causally necessary that</p><p class="document-paragraph mb-4">(ii) The fire flared up.</p><p class="document-paragraph mb-4">But (ii) isn’t a logical consequence of (i). In other words, it can’t be known</p><p class="document-paragraph mb-4">through meaning-analysis or syntax-chopping that (ii) cannot be false if (i) is</p><p class="document-paragraph mb-4">true.</p><h3 class="text-xl font-semibold mt-8 mb-4 text-foreground">2.3 Principles and theorems of formal logic</h3><p class="document-paragraph mb-4">1. For any x and any y, ((x = y)→(for any property F, (x has F↔y has F))).</p><p class="document-paragraph mb-4">(Leibniz’s Law.)</p><p class="document-paragraph mb-4">Given anything x and anything y, if x is the very same thing as y, then x has a</p><p class="document-paragraph mb-4">given property just in case y has that property.</p><p class="document-paragraph mb-4">If x is the very same thing as y, then anything true of the one is true of the</p><p class="document-paragraph mb-4">other.</p><p class="document-paragraph mb-4">Anything true of one thing is true of another whenever those things are one</p><p class="document-paragraph mb-4">and the same.</p><p class="document-paragraph mb-4">A necessary condition for identity is sameness of properties.</p><p class="document-paragraph mb-4">Commentary: In Chapter 16 of Analytic Philosophy, it is argued that,</p><p class="document-paragraph mb-4">although this principle is clearly true for “synchronic” identity-clams, it is</p><p class="document-paragraph mb-4">clearly false for “diachronic” identity claims.</p><p class="document-paragraph mb-4">2. For any x and any y, (given any property F, ((x has F↔y has F)→(x = y)))</p><p class="document-paragraph mb-4">(The identity of indiscernibles.)</p><p class="document-paragraph mb-4">Given anything x and anything y, if it the case that x has a given property just</p><p class="document-paragraph mb-4">in case y has that property, then it follows that x is the very same thing as x.</p><p class="document-paragraph mb-4">If x has no properties that y lacks and y has no properties that x lacks, then x</p><p class="document-paragraph mb-4">is the very same thing as y.</p><p class="document-paragraph mb-4">A sufficient condition for identity is sameness of properties.</p><p class="document-paragraph mb-4">Commentary: Though it has been questioned, this principle is clearly correct.</p><p class="document-paragraph mb-4">Given any object x, x has the property of being identical with x. So, given</p><p class="document-paragraph mb-4">any object y, if y has every property that x has, then y has the property of</p><p class="document-paragraph mb-4">being identical with x and is therefore itself identical with x.</p><p class="document-paragraph mb-4">But, while it’s true that anything having that property is identical with x,</p><p class="document-paragraph mb-4">it’s also trivial. And my suspicion is that those who claim to be asking</p><p class="document-paragraph mb-4">whether the identity of indiscernibles is correct are really asking a distinct but</p><p class="document-paragraph mb-4">related question, namely: given an object y that has every property had by x,</p><p class="document-paragraph mb-4">setting aside those properties that are trivially had by anything identical with</p><p class="document-paragraph mb-4">x (e.g., the property of being identical with x), is y identical with x?</p><p class="document-paragraph mb-4">That question, unlike the question of whether the identity of indiscernibles</p><p class="document-paragraph mb-4">is correct, isn’t trivial. That said, the answer to it does seem, quite clearly, to</p><p class="document-paragraph mb-4">be “yes.” If, at any given moment, x is in the same place as y, has the same</p><p class="document-paragraph mb-4">mass, is subjected to the same forces, and so on, then surely x is identical</p><p class="document-paragraph mb-4">with y.</p><p class="document-paragraph mb-4">Additional commentary: The identity of indiscernibles is often said to be the</p><p class="document-paragraph mb-4">“converse” of Leibniz’s Law.</p><p class="document-paragraph mb-4">This isn’t correct. For P to be the converse of Q, it is necessary that P be a</p><p class="document-paragraph mb-4">conditional statement and that Q also be a conditional statement. Leibniz’s</p><p class="document-paragraph mb-4">Law isn’t expressed by a conditional statement, and neither is the identity of</p><p class="document-paragraph mb-4">indiscernibles.</p><p class="document-paragraph mb-4">Each is expressed by a universal generalization. In each case, that</p><p class="document-paragraph mb-4">universal generalization is to the effect that each member of an infinitely</p><p class="document-paragraph mb-4">large class of conditional statements is correct. But neither is itself expressed</p><p class="document-paragraph mb-4">by a conditional statement, and neither is itself a conditional proposition.</p><p class="document-paragraph mb-4">Leibniz’s Law is to the effect that:</p><p class="document-paragraph mb-4">(LL) for any x and any y, if x is identical with y, it’s impossible for x to lack</p><p class="document-paragraph mb-4">any property had by y or vice versa.</p><p class="document-paragraph mb-4">LL is not itself a conditional statement. For the same reason mutatis</p><p class="document-paragraph mb-4">mutandis, the identity of indiscernibles isn’t given by a conditional statement.</p><p class="document-paragraph mb-4">Therefore, neither principle is the converse of the other.</p><h3 class="text-xl font-semibold mt-8 mb-4 text-foreground">3. P or ~P. (The law of excluded middle.)</h3><p class="document-paragraph mb-4">Any given statement is either true or false.</p><p class="document-paragraph mb-4">What isn’t true or false is not a statement.</p><p class="document-paragraph mb-4">S is a statement only if S is either true or false.</p><p class="document-paragraph mb-4">S’s being a statement is sufficient for S’s being either true or false.</p><p class="document-paragraph mb-4">S’s being either true or false is necessary for S’s being a statement.</p><p class="document-paragraph mb-4">Commentary: Whether or not 3 is correct depends on what the word</p><p class="document-paragraph mb-4">“statement” is taken to mean. If it’s taken to mean the same thing as</p><p class="document-paragraph mb-4">“sentence,” then 3 is false. The sentence (in other words, the sentence-type)</p><p class="document-paragraph mb-4">“I am tired” is neither true nor false. (Certain utterances of it are true and</p><p class="document-paragraph mb-4">certain utterances of it are false.)</p><p class="document-paragraph mb-4">If the word “statement” is taken to mean the same thing as “sentence-</p><p class="document-paragraph mb-4">utterance” (or, more generally, “sentence-token”), then, once again, 3 is</p><p class="document-paragraph mb-4">false. If, while pointing to an empty space, I say “that elephant is in terrible</p><p class="document-paragraph mb-4">pain,” what I’ve said is neither true nor false. There is no such elephant.</p><p class="document-paragraph mb-4">Therefore, there is no elephant x such that I am saying that x in terrible pain.</p><p class="document-paragraph mb-4">If I am saying anything at all, there is some elephant x such that what I am</p><p class="document-paragraph mb-4">saying is true iff x is in terrible pain. Since there is no such elephant, I’m not</p><p class="document-paragraph mb-4">saying anything; my utterance is neither true nor false.</p><p class="document-paragraph mb-4">If the word “statement” is taken to mean the same thing as “proposition,”</p><p class="document-paragraph mb-4">then 3 is correct. What we are seeing is that the so-called truths of symbolic</p><p class="document-paragraph mb-4">logic—the “laws of logic”—aren’t true at all. They’re statement-forms, not</p><p class="document-paragraph mb-4">statements, and therefore aren’t true or false. And it isn’t easy to find</p><p class="document-paragraph mb-4">interpretations of those statement-forms that validate them. In other words, it</p><p class="document-paragraph mb-4">isn’t easy to figure out what sorts of constants must replace the variables</p><p class="document-paragraph mb-4">occurring in these “laws” if true sentences are to result. This suggests that</p><p class="document-paragraph mb-4">modern symbolic logic (a.k.a. mathematical logic, a.k.a. formal logic) isn’t</p><p class="document-paragraph mb-4">logic at all. It’s actually a small and rather unimportant branch of a discipline</p><p class="document-paragraph mb-4">known as “model theory.” In Section 3.4, we’ll see why, given this fact, it</p><p class="document-paragraph mb-4">follows that formal logic has little to do with the way in which any actual or</p><p class="document-paragraph mb-4">even possible being reasons.</p><h3 class="text-xl font-semibold mt-8 mb-4 text-foreground">4. ~(P and ~P). (The law of non-contradiction.)</h3><p class="document-paragraph mb-4">No statement is both true and false.</p><p class="document-paragraph mb-4">The class of statements that are both true and false is empty.</p><p class="document-paragraph mb-4">What isn’t true, when non a belief, is either false or a non-statement.</p><p class="document-paragraph mb-4">What isn’t false, when not a belief, is either true or a non-statement.</p><h3 class="text-xl font-semibold mt-8 mb-4 text-foreground">5. (P and (P→Q))→Q. (Modus Ponens.)</h3><p class="document-paragraph mb-4">Supposing that P, and supposing that P entails Q, it follows that Q.</p><p class="document-paragraph mb-4">Any consequence of a truth is a truth.</p><p class="document-paragraph mb-4">The consequent of a conditional statement with a true antecedent is a truth.</p><p class="document-paragraph mb-4">If the antecedent of a conditional is true, so is the consequent.</p><p class="document-paragraph mb-4">The class of truths is closed under the relation of logical consequence.</p><p class="document-paragraph mb-4">Example (henceforth “SD”):</p><p class="document-paragraph mb-4">Premise: Smith is a dog.</p><p class="document-paragraph mb-4">Premise: If Smith is a dog, then Smith is a mammal.</p><p class="document-paragraph mb-4">Conclusion: Smith is a mammal.</p><p class="document-paragraph mb-4">Commentary: Consider the following argument (henceforth “SD#”):</p><p class="document-paragraph mb-4">(1) Smith is a dog.</p><p class="document-paragraph mb-4">(2) All dogs are mammals.</p><p class="document-paragraph mb-4">Conclusion: (3) Smith is a mammal.</p><p class="document-paragraph mb-4">SD# is not an instance of modus ponens. To be an instance of modus ponens,</p><p class="document-paragraph mb-4">an argument must have the form:</p><p class="document-paragraph mb-4">(1*) P</p><p class="document-paragraph mb-4">(2*) If P, then Q</p><p class="document-paragraph mb-4">Conclusion: (3*) Q.</p><p class="document-paragraph mb-4">Let’s refer to this argument form as “AF*.”</p><p class="document-paragraph mb-4">If we replace the occurrence of “P” in AF* with “Smith is a dog” and we</p><p class="document-paragraph mb-4">replace the occurrence of “Q” with “Smith is a mammal,” the result is SD,</p><p class="document-paragraph mb-4">not SD#. There are no sentences such that, if the sentence-level variables in</p><p class="document-paragraph mb-4">AF are replaced with those sentences, the result is SD#. Therefore, SD# is not</p><p class="document-paragraph mb-4">an instance of modus ponens.</p><p class="document-paragraph mb-4">SD# is a valid argument. But it isn’t an instance of modus ponens. It’s an</p><p class="document-paragraph mb-4">instance of the following argument form:</p><p class="document-paragraph mb-4">(1#) A has property P.</p><p class="document-paragraph mb-4">(2#) For any x, if x has P, then x has Q.</p><p class="document-paragraph mb-4">Conclusion: (3#) A has Q.</p><p class="document-paragraph mb-4">Let’s refer to this argument form as “AF#.”</p><p class="document-paragraph mb-4">SD# makes a statement about SD. SD# says that SD is an instance of</p><p class="document-paragraph mb-4">modus ponens. If S is a statement that says of some argument A that A is an</p><p class="document-paragraph mb-4">instance of modus ponens, S is not itself an instance of modus ponens. Thus,</p><p class="document-paragraph mb-4">SD# is not itself an instance of modus ponens.</p><h3 class="text-xl font-semibold mt-8 mb-4 text-foreground">6. (P→Q) and ~Q) →~P. (Modus tollens)</h3><p class="document-paragraph mb-4">A given statement is false if any one of its logical consequences is false.</p><p class="document-paragraph mb-4">Premise: If Smith is a dog, then Smith is a mammal.</p><p class="document-paragraph mb-4">Premise: Smith isn’t a mammal.</p><p class="document-paragraph mb-4">Conclusion: Smith is not a dog.</p><h3 class="text-xl font-semibold mt-8 mb-4 text-foreground">7. (P and ~Q) →~(P→Q).</h3><p class="document-paragraph mb-4">Deduction is truth-preserving.</p><p class="document-paragraph mb-4">No true statement entails a false one.</p><p class="document-paragraph mb-4">Truth implies truth.</p><p class="document-paragraph mb-4">Truth follows from truth.</p><p class="document-paragraph mb-4">Explanation: If P is actually true and Q is actually false, there is obviously a</p><p class="document-paragraph mb-4">possible circumstance where P is true and Q is false. (What is actual must be</p><p class="document-paragraph mb-4">possible. The impossible isn’t actual.) An immediate consequence is that P</p><p class="document-paragraph mb-4">doesn’t entail Q.</p><p class="document-paragraph mb-4">8. ((P→Q) and (Q→R))→(P→R) (If P entails Q and Q entails R, then P</p><p class="document-paragraph mb-4">entails R.)</p><p class="document-paragraph mb-4">Entailment is transitive.</p><p class="document-paragraph mb-4">A statement entails anything that any given one of its consequences entail.</p><p class="document-paragraph mb-4">The property of being true is hereditary with respect to the consequence-</p><p class="document-paragraph mb-4">relation.</p><p class="document-paragraph mb-4">If K is the smallest class containing a given truth P and the logical</p><p class="document-paragraph mb-4">consequence any given truth that it contains, then each of K’s members is a</p><p class="document-paragraph mb-4">truth.</p><p class="document-paragraph mb-4">Commentary: (8) is a corollary of Principle (7).</p><p class="document-paragraph mb-4">Also, (8) is equivalent with</p><p class="document-paragraph mb-4">(8*) (P→Q)→((Q→R))→(P→R)).</p><p class="document-paragraph mb-4">If P entails Q, then P entails R provided that Q entails R.</p><p class="document-paragraph mb-4">Each of (8) and (8*) is equivalent with each of the following:</p><p class="document-paragraph mb-4">Q is a consequence of P only if every consequence of Q is a consequence of</p><p class="document-paragraph mb-4">P.</p><p class="document-paragraph mb-4">Q is not a consequence of P unless every consequence of Q is a consequence</p><p class="document-paragraph mb-4">of P.</p><p class="document-paragraph mb-4">Consequences of consequences are consequences.</p><p class="document-paragraph mb-4">9. P→~~P. (The law of double-negation.)</p><p class="document-paragraph mb-4">Statements entail the negations of their negations.</p><p class="document-paragraph mb-4">A necessary condition for the truth of a given statement is that the negation of</p><p class="document-paragraph mb-4">its negation be true.</p><p class="document-paragraph mb-4">A statement isn’t true unless the negation of its negation is true.</p><p class="document-paragraph mb-4">Premise: Smith is a professor.</p><p class="document-paragraph mb-4">Conclusion: It’s not the case that Smith is not a professor.</p><p class="document-paragraph mb-4">10. P→(P or Q).</p><p class="document-paragraph mb-4">No false disjunction contains a true disjunct.</p><p class="document-paragraph mb-4">A necessary condition for the truth a disjunction is that one of the disjuncts</p><p class="document-paragraph mb-4">be true.</p><p class="document-paragraph mb-4">A sufficient condition for the falsity of a disjunction is that each of its</p><p class="document-paragraph mb-4">disjuncts be false.</p><p class="document-paragraph mb-4">11. ~(P or Q)↔(~P and ~Q).</p><p class="document-paragraph mb-4">A disjunction is false iff all of its disjuncts are false.</p><p class="document-paragraph mb-4">A disjunction is false exactly if each of its disjuncts is false.</p><p class="document-paragraph mb-4">A disjunction is false unless at least one of its disjuncts is true.</p><p class="document-paragraph mb-4">12. ~P→~(P and Q).</p><p class="document-paragraph mb-4">No true conjunction contains a false conjunct.</p><p class="document-paragraph mb-4">A conjunction is false unless each conjunct is true.</p><p class="document-paragraph mb-4">13. ~(P and Q)↔(~P or ~Q).</p><p class="document-paragraph mb-4">A conjunction is false just in case at least one of its conjuncts is false.</p><p class="document-paragraph mb-4">14. ((P or Q) and ~P)→Q (DeMorgan’s Law)</p><p class="document-paragraph mb-4">Given a true disjunction, the one disjuncts follows from the negation of the</p><p class="document-paragraph mb-4">other.</p><p class="document-paragraph mb-4">Premise: Either Jones is a plant or Smith is in the house.</p><p class="document-paragraph mb-4">Premise: Jones isn’t a plant.</p><p class="document-paragraph mb-4">Conclusion: Therefore Smith is in the house.</p><p class="document-paragraph mb-4">15. ~((~P and Q)→~(P→Q))</p><p class="document-paragraph mb-4">A false statement may entail a true one.</p><p class="document-paragraph mb-4">The property of being false is not hereditary with respect to the consequence-</p><p class="document-paragraph mb-4">relation.</p><p class="document-paragraph mb-4">Explanation: “Paris is in France and Spain is north of Sweden” entails “Paris</p><p class="document-paragraph mb-4">in France.” Any given true statement is entailed by each of the infinitely</p><p class="document-paragraph mb-4">many false conjunctions of which it is a conjunct. For that reason, and others,</p><p class="document-paragraph mb-4">a false statement may entail a true one. (But a true one cannot entail a false</p><p class="document-paragraph mb-4">one.)</p><p class="document-paragraph mb-4">16. ~((P→Q)→(Q→P))</p><p class="document-paragraph mb-4">Propositions aren’t always consequences of their own consequences.</p><p class="document-paragraph mb-4">Conversion isn’t truth-preserving.</p><p class="document-paragraph mb-4">“Paris is in France and Spain is north of Sweden” entails “Paris in France,”</p><p class="document-paragraph mb-4">but not vice versa.</p><p class="document-paragraph mb-4">17. P→P</p><p class="document-paragraph mb-4">Statements self-entail.</p><p class="document-paragraph mb-4">Explanation: P entails P iff it isn’t possible for (P and ~P ) to be true. It isn’t</p><p class="document-paragraph mb-4">possible for (P and ~P) to be true. (The law of non-contradiction forbids it.)</p><p class="document-paragraph mb-4">Therefore, P entails P.</p><p class="document-paragraph mb-4">18. ~Q→((P→Q)→~P)</p><p class="document-paragraph mb-4">Nothing but falsity entails falsity.</p><p class="document-paragraph mb-4">19. (Q→(P and ~P))→~Q.</p><p class="document-paragraph mb-4">Nothing true entails a contradiction.</p><p class="document-paragraph mb-4">Explanation: No true statement entails a false one. (Principle 18.) (P and ~P)</p><p class="document-paragraph mb-4">is false. (Principle 4.) So for any proposition P, no true statement entails (P</p><p class="document-paragraph mb-4">and ~P).</p><p class="document-paragraph mb-4">20.(P→~P)→~P</p><p class="document-paragraph mb-4">A statement is false if it entails its own negation.</p><p class="document-paragraph mb-4">No true statement is incompatible with itself.</p><p class="document-paragraph mb-4">Only false statements are incompatible with themselves.</p><p class="document-paragraph mb-4">Explanation: Any given statement entails itself. (Principle 17.) So if a</p><p class="document-paragraph mb-4">statement P entails its own negation, it follows that P entails (P and ~P). (P</p><p class="document-paragraph mb-4">and ~P) is false. (Principle 4.) Therefore, a statement is false if it entails its</p><p class="document-paragraph mb-4">own negation.</p><p class="document-paragraph mb-4">21. (P and ~P)→Q</p><p class="document-paragraph mb-4">Nothing doesn’t follow from a contradiction.</p><p class="document-paragraph mb-4">Explanation: There is no possible circumstance where (P and ~P) is true.</p><p class="document-paragraph mb-4">Therefore, for any proposition Q, there is no possible circumstance where Q</p><p class="document-paragraph mb-4">is false and where (P and ~P) is true.</p><p class="document-paragraph mb-4">Some principles of modal logic</p><p class="document-paragraph mb-4">1M. P→#P.</p><p class="document-paragraph mb-4">Whatever is actual is possible.</p><p class="document-paragraph mb-4">2M. □P→P.</p><p class="document-paragraph mb-4">Whatever is necessary is actual.</p><p class="document-paragraph mb-4">3M. □P→ #P.</p><p class="document-paragraph mb-4">Whatever is necessary is possible.</p><p class="document-paragraph mb-4">Given that squares must have four sides, they do have four sides.</p><p class="document-paragraph mb-4">Commentary: This shows that there is a difference between the possible and</p><p class="document-paragraph mb-4">the contingently true. The contingently true doesn’t have to be true; but the</p><p class="document-paragraph mb-4">possible is sometimes necessarily, and therefore non-contingently, true.</p><p class="document-paragraph mb-4">4M. (P→Q)↔~ #(P and ~Q).</p><p class="document-paragraph mb-4">P entails Q iff P can’t be true if Q is false.</p><p class="document-paragraph mb-4">Explanation: This is a definition, not a principle. To say that P entails Q is to</p><p class="document-paragraph mb-4">say that it’s impossible for P to be true if Q is false.</p><p class="document-paragraph mb-4">5M. □(P and Q)↔(□P and □Q).</p><p class="document-paragraph mb-4">A conjunction is necessarily true iff each conjunct is necessarily true.</p><p class="document-paragraph mb-4">Explanation: If P isn’t necessarily true, there is some possible circumstance</p><p class="document-paragraph mb-4">where it’s false and where, therefore, (P and Q) is false, no matter what Q is.</p><p class="document-paragraph mb-4">If (P and Q) is necessarily true, there is no circumstance where (P and Q) is</p><p class="document-paragraph mb-4">false or, therefore, where either P is false or Q is false.</p><p class="document-paragraph mb-4">6M. □~(P or Q)↔(□~P and □~Q).</p><p class="document-paragraph mb-4">A disjunction is necessarily false iff each disjunct is necessarily false.</p><p class="document-paragraph mb-4">Explanation: Each of P and Q must be false in every possible world in order</p><p class="document-paragraph mb-4">for ~(P or Q) to be false in every possible world; and there’s no way that ~(P</p><p class="document-paragraph mb-4">or Q) can be true in any possible world if each of P and Q is false in every</p><p class="document-paragraph mb-4">possible world.</p><p class="document-paragraph mb-4">7M.(□P and #~Q)→~(P→Q).</p><p class="document-paragraph mb-4">Nothing that can be false is a consequence of anything that cannot be false.</p><p class="document-paragraph mb-4">Explanation: If P is necessarily true (true in all circumstances), whereas Q is</p><p class="document-paragraph mb-4">possibly false (false in some circumstances), there are circumstances where P</p><p class="document-paragraph mb-4">is true and Q is false (i.e., P doesn’t entail Q).</p><p class="document-paragraph mb-4">8M. ~(( # P and #Q)→ # (P and Q)).</p><p class="document-paragraph mb-4">Conjoining two possible statements may yield a necessarily false statement.</p><p class="document-paragraph mb-4">Explanation: “On June 12, 2009, JMK did not at any time leave the state of</p><p class="document-paragraph mb-4">Virginia” is possible, and so is “On June 12, 2009, JMK did at some point</p><p class="document-paragraph mb-4">leave the state of Virginia.” But they’re not compossible (i.e., they cannot</p><p class="document-paragraph mb-4">both be true).</p><p class="document-paragraph mb-4">9M.(# P and □~Q) → ~(P→Q)</p><p class="document-paragraph mb-4">Nothing that can be true entails anything that cannot be true.</p><p class="document-paragraph mb-4">Explanation: If P is true in some possible circumstance, whereas Q is true in</p><p class="document-paragraph mb-4">none, there is a possible circumstance where P is true and Q is false, which</p><p class="document-paragraph mb-4">means that P doesn’t entail Q.</p><p class="document-paragraph mb-4">10M. □P→(Q→P)</p><p class="document-paragraph mb-4">Given any necessarily true statement, there is no statement that doesn’t entail</p><p class="document-paragraph mb-4">it.</p><p class="document-paragraph mb-4">Explanation: If P is necessarily true, there are no possible circumstances</p><p class="document-paragraph mb-4">where P false. A fortiori, there is no possible circumstances where, for any</p><p class="document-paragraph mb-4">proposition Q, P is false and Q is true.</p><p class="document-paragraph mb-4">11M.~□P→(P→Q)</p><p class="document-paragraph mb-4">Given any statement at all, be it true or false, there is no necessarily false</p><p class="document-paragraph mb-4">statement that doesn’t entail it.</p><p class="document-paragraph mb-4">Explanation: If P is necessarily false, there is no possible circumstance where</p><p class="document-paragraph mb-4">P is true. A fortiori, there is no possible circumstance where, for any</p><p class="document-paragraph mb-4">proposition Q, P is true and Q is false.</p><p class="document-paragraph mb-4">12M. □(P→Q)→(□P→□Q).</p><p class="document-paragraph mb-4">A statement is necessary if it’s entailed by a necessary conditional with a</p><p class="document-paragraph mb-4">necessary antecedent.</p><p class="document-paragraph mb-4">Exercise: 13M can be seen as a</p><p class="document-paragraph mb-4">generalization</p><p class="document-paragraph mb-4">of</p><p class="document-paragraph mb-4">Modus</p><p class="document-paragraph mb-4">ponens.</p><p class="document-paragraph mb-4">Explain why this is so. Exercise: Is</p><p class="document-paragraph mb-4">“(□P→□Q)→□(P→Q)”</p><p class="document-paragraph mb-4">a</p><p class="document-paragraph mb-4">correct</p><p class="document-paragraph mb-4">principle? Explain why or why not.</p><p class="document-paragraph mb-4">13M. □P→□□P. (“S5.”)</p><p class="document-paragraph mb-4">Whatever is necessary is necessarily necessary.</p><p class="document-paragraph mb-4">Explanation: Point #1: If ~□□P, then there is some possible circumstance</p><p class="document-paragraph mb-4">where ~□P. By contraposition, if there is no possible circumstance where</p><p class="document-paragraph mb-4">~□P, then □□P is true. Point #2: If ~□P, then there is some possible</p><p class="document-paragraph mb-4">circumstance where ~P. By contraposition, if there is no possible</p><p class="document-paragraph mb-4">circumstance where ~P, then □P is true. Point #3: Given Points #1 and #2, t</p><p class="document-paragraph mb-4">follows that, if □P, then □□P. Conclusion: S5 is correct.</p><p class="document-paragraph mb-4">14M. # P→ ## P.</p><p class="document-paragraph mb-4">What is possible is possibly possible.</p><h3 class="text-xl font-semibold mt-8 mb-4 text-foreground">3.0 Some meta-logical principles: Model theoretic entailment</h3><p class="document-paragraph mb-4">P model-theoretically entails Q just in case there is no coherently conceivable</p><p class="document-paragraph mb-4">scenario where P is true and Q is false.</p><p class="document-paragraph mb-4">Thus, 1 + 1 = 2 model-theoretically entails triangles have three sides,</p><p class="document-paragraph mb-4">even though the two propositions do not, apart from that, have anything to do</p><p class="document-paragraph mb-4">with each other.</p><p class="document-paragraph mb-4">This last point is important. There isn’t anything about shapes, let alone</p><p class="document-paragraph mb-4">triangles specifically, in 1 + 1 = 2; and there isn’t anything about addition in</p><p class="document-paragraph mb-4">triangles have three sides. So even though, technically, each entails the other,</p><p class="document-paragraph mb-4">there is no significant sense in which the one can be inferred from the other</p><p class="document-paragraph mb-4">—no sense in which a knowledge of the one yields a knowledge of the other.</p><p class="document-paragraph mb-4">Of course, somebody who knows that 1 + 1 = 2 will probably also know</p><p class="document-paragraph mb-4">that triangles have three sides, but he won’t know the one on the basis of the</p><p class="document-paragraph mb-4">other. By contrast, somebody who knows that x is a case of true belief could</p><p class="document-paragraph mb-4">potentially know that on the basis of the fact that x is knowledge.</p><p class="document-paragraph mb-4">Commentary: Model-theoretic entailment is an over-valued notion that</p><p class="document-paragraph mb-4">doesn’t correspond at all well to the conception of entailment embodied in</p><p class="document-paragraph mb-4">our inferential practices. Nonetheless, because, in the early ‘60’s, some</p><p class="document-paragraph mb-4">branches of philosophy were (wrongly) thought to be successfully assimilated</p><p class="document-paragraph mb-4">to a branch of mathematics known as “model theory”—the purpose of this</p><p class="document-paragraph mb-4">branch being to study model-theoretic entailment—philosophers now tend to</p><p class="document-paragraph mb-4">treat model-theoretic entailment as the fundamental kind of entailment.</p><p class="document-paragraph mb-4">Model-theoretic entailment isn’t really a kind of entailment. It is a theory</p><p class="document-paragraph mb-4">of entailment. Like other scientists, logicians model data. Where logic is</p><p class="document-paragraph mb-4">concerned, the data in question are intuitions on our part to the effect that one</p><p class="document-paragraph mb-4">statement is a consequence of another.</p><p class="document-paragraph mb-4">(K1) “x is knowledge”</p><p class="document-paragraph mb-4">entails</p><p class="document-paragraph mb-4">(K2) “x is a true belief.”</p><p class="document-paragraph mb-4">Logicians want to make it clear what it is that we know in knowing this; they</p><p class="document-paragraph mb-4">want to make it clear what it is for the one statement to entail the second.</p><p class="document-paragraph mb-4">Here is the proposal that they came up with:</p><p class="document-paragraph mb-4">(MT) for P to entail Q is for there to be no possible circumstance in which</p><p class="document-paragraph mb-4">the first is true and the second is false.</p><p class="document-paragraph mb-4">Why did logicians choose MT when trying to model our intuitions</p><p class="document-paragraph mb-4">concerning entailment? Because MT is extensionally correct. In other words,</p><p class="document-paragraph mb-4">for any statements P and Q, P entails Q iff there is no possible circumstance</p><p class="document-paragraph mb-4">where P is true and Q is false.</p><p class="document-paragraph mb-4">But even though there are no counter-examples to it, MT is false. It is</p><p class="document-paragraph mb-4">obviously in virtue of facts about the structures of K1 and K2 that the former</p><p class="document-paragraph mb-4">entails the latter. The fact that there are no models in which K1 is true and K2</p><p class="document-paragraph mb-4">is false is a mere consequence of that structural fact.</p><p class="document-paragraph mb-4">There is a related point. MT defines entailment in terms of “possible.” This</p><p class="document-paragraph mb-4">makes it viciously circular. P and Q are compossible (in other words, both P</p><p class="document-paragraph mb-4">and Q is possible) iff neither entails the negation of the other. We understand</p><p class="document-paragraph mb-4">the concept of possibility only to the extent that we can understand it in terms</p><p class="document-paragraph mb-4">of entailment (and other bearing-relations). So unless we’re willing to take</p><p class="document-paragraph mb-4">the radically implausible view that “possible” is a primitive expression, MT</p><p class="document-paragraph mb-4">defines “entailment” in terms of itself. (A primitive expression is one that</p><p class="document-paragraph mb-4">doesn’t consist of other expressions. Examples of such expressions are “red”</p><p class="document-paragraph mb-4">or “sweet.”)</p><p class="document-paragraph mb-4">To make MT non-circular, we must rid it of the word “possible.” Thus</p><p class="document-paragraph mb-4">modified, MT is:</p><p class="document-paragraph mb-4">(MT*) for P to “entail” Q is for there to be no circumstance in which the first</p><p class="document-paragraph mb-4">is true and the second is false.</p><p class="document-paragraph mb-4">In MT*, ‘circumstance’ must be mean actual circumstance. If it means</p><p class="document-paragraph mb-4">anything else, MT* will be circular, like MT.</p><p class="document-paragraph mb-4">MT* is false. There is no circumstance in which the moon is made of</p><p class="document-paragraph mb-4">cheese. And there is no circumstance in which I have ten cars. So there is no</p><p class="document-paragraph mb-4">circumstance in which “the moon is made of cheese” is true and in which</p><p class="document-paragraph mb-4">“JMK has ten cars” is false. So, according to MT*, the former entails the</p><p class="document-paragraph mb-4">latter. But the former doesn’t entail the latter. (The former “materially</p><p class="document-paragraph mb-4">implies” the latter. But that’s irrelevant, since material implication isn’t</p><p class="document-paragraph mb-4">entailment.)</p><p class="document-paragraph mb-4">So model-theoretic entailment isn’t entailment at all. It’s what a wrong</p><p class="document-paragraph mb-4">theory of entailment says that it is.</p><p class="document-paragraph mb-4">Some of the principles stated in Section 2.3, not all of them, go through</p><p class="document-paragraph mb-4">only if “entails” (i.e. “→”) is taken to refer to model-theoretic entailment.</p><h3 class="text-xl font-semibold mt-8 mb-4 text-foreground">3.1 Formal entailment</h3><p class="document-paragraph mb-4">In some cases, one statement’s following from another can be determined</p><p class="document-paragraph mb-4">entirely on the basis of the structures of those sentences. For any statements P</p><p class="document-paragraph mb-4">and Q, ‹P and Q› entails ‹P.› For any statement P, ‹not not P› entails ‹P›. In</p><p class="document-paragraph mb-4">other words, “if not-not-P, then P” is true.</p><p class="document-paragraph mb-4">If it can be determined that Q follows from P entirely on the basis of the</p><p class="document-paragraph mb-4">structural properties of those sentences, P formally entails Q.</p><p class="document-paragraph mb-4">For a while, it was thought that all entailments could be formalized—that</p><p class="document-paragraph mb-4">is, that whenever one statement entails another, it is entirely because of the</p><p class="document-paragraph mb-4">syntactic or structural properties of those sentences. That viewpoint is simply</p><p class="document-paragraph mb-4">false. Why it is false is explained in Chapter 1 of Analytic Philosophy,</p><p class="document-paragraph mb-4">Section 6.0.</p><h3 class="text-xl font-semibold mt-8 mb-4 text-foreground">3.2 Formal entailment a relation between expressions</h3><p class="document-paragraph mb-4">Only expressions have syntax. So, since P formally entails Q only if P and Q</p><p class="document-paragraph mb-4">have certain syntactic properties, the relation of formal entailment holds</p><p class="document-paragraph mb-4">between sentences (or sentence-tokens), whereas the relations of model-</p><p class="document-paragraph mb-4">theoretic entailment holds between propositions, the same being true of</p><p class="document-paragraph mb-4">“informal, non-model-theoretic entailment,” which I will now define.</p><p class="document-paragraph mb-4">3.3 The one genuinely important kind of entailment: The informal, non-</p><p class="document-paragraph mb-4">model-theoretic kind</p><p class="document-paragraph mb-4">Let P1 be the statement John knows that 1 + 1 = 2, and let Q1 be the</p><p class="document-paragraph mb-4">statement John believes that 1 + 1 = 2.</p><p class="document-paragraph mb-4">P1 model-theoretically entails Q1. In other words, there is no coherently</p><p class="document-paragraph mb-4">conceivable scenario where P1 is true and Q1 is false.</p><p class="document-paragraph mb-4">But the entailment relation that holds between P1 and Q1 is not just an</p><p class="document-paragraph mb-4">instance of model-theoretic entailment; it is also an instance of another, more</p><p class="document-paragraph mb-4">significant kind of entailment. This is made clear by the fact that there is a</p><p class="document-paragraph mb-4">marked difference between, on the one hand, the relation that holds between</p><p class="document-paragraph mb-4">P1 and Q1 and, on the other hand, the relation that holds between:</p><p class="document-paragraph mb-4">P2: 1 + 1 = 2</p><p class="document-paragraph mb-4">and</p><p class="document-paragraph mb-4">Q2: triangles have three sides.</p><p class="document-paragraph mb-4">The difference is clear. Given the information contained in P1, it can be</p><p class="document-paragraph mb-4">deduced that Q1 is true. Q1 is, in some important sense, “implicit in” or</p><p class="document-paragraph mb-4">“contained in” P1. But Q2 isn’t implicit in P2. There isn’t anything concerning</p><p class="document-paragraph mb-4">triangles in P2—not implicitly or explicitly.</p><p class="document-paragraph mb-4">When we make inferences, they are not of the strictly model-theoretic</p><p class="document-paragraph mb-4">kind. Rather, they are of the kind where the statement that is inferred is, in</p><p class="document-paragraph mb-4">some way or other, contained in the statement from which the inference is</p><p class="document-paragraph mb-4">made. So the inference from:</p><p class="document-paragraph mb-4">P1: John knows that 1 + 1 = 2</p><p class="document-paragraph mb-4">to</p><p class="document-paragraph mb-4">Q1: John believes that 1 + 1 = 2</p><p class="document-paragraph mb-4">is an instance of the conception of entailment that is embodied in our actual</p><p class="document-paragraph mb-4">inferential practices. But that inference isn’t formal; it isn’t like the inference</p><p class="document-paragraph mb-4">from snow is white and grass is green to snow is white: the formal properties</p><p class="document-paragraph mb-4">of P1 and Q1 leave it open whether Q1 follows from P1. This is because those</p><p class="document-paragraph mb-4">sentences are formally identical with, respectively,</p><p class="document-paragraph mb-4">P3: John is sure that 1 + 1 = 2</p><p class="document-paragraph mb-4">and</p><p class="document-paragraph mb-4">Q3: John doubts that 1 + 1 = 2.</p><p class="document-paragraph mb-4">P1 is syntactically just like P3, and Q1 is syntactically just like Q3. But there is</p><p class="document-paragraph mb-4">no legitimate inference from P3 to Q3; and since those sentences are</p><p class="document-paragraph mb-4">syntactically just like P1 and Q1, respectively, it follows there is no legitimate,</p><p class="document-paragraph mb-4">purely syntactic inference from P1 to Q1.</p><p class="document-paragraph mb-4">Although, as previously discussed, P1 model-theoretically entails Q1, P1</p><p class="document-paragraph mb-4">also entails Q1 in some other, much more robust sense. In Kuczynski (2007),</p><p class="document-paragraph mb-4">I put forth a theory as to the nature of this other, more important sort of</p><p class="document-paragraph mb-4">entailment.</p><h3 class="text-xl font-semibold mt-8 mb-4 text-foreground">3.5 The ampliative character of deduction</h3><p class="document-paragraph mb-4">It is often said that, if P entails Q, there is nothing in Q that is not also in P.</p><p class="document-paragraph mb-4">So deduction (i.e., the identifying of entailments) is, according to this, “non-</p><p class="document-paragraph mb-4">ampliative”—the consequent doesn’t “amplify” the antecedent (i.e., it doesn’t</p><p class="document-paragraph mb-4">say anything not said by the antecedent).</p><p class="document-paragraph mb-4">This position is obviously false where model-theoretic entailment is</p><p class="document-paragraph mb-4">concerned. (Triangles are shapes model-theoretically entails Socrates is</p><p class="document-paragraph mb-4">identical with Socrates, but there is nothing in the content of the first that has</p><p class="document-paragraph mb-4">anything to do with Socrates.) And it’s obviously false where formal</p><p class="document-paragraph mb-4">entailment is concerned. (“Smith is tall” formally entails “either Smith is tall</p><p class="document-paragraph mb-4">or grass is green,” but there is nothing about grass in “Smith is tall.”)</p><h3 class="text-xl font-semibold mt-8 mb-4 text-foreground">3.6 The most important kind of entailment: the non-formal, non-model</h3><p class="document-paragraph mb-4">theoretic kind</p><p class="document-paragraph mb-4">The statement</p><p class="document-paragraph mb-4">(P) 1+1=2</p><p class="document-paragraph mb-4">model-theoretically entails</p><p class="document-paragraph mb-4">(Q) the interior angles of a Euclidean triangle add up to 180°.</p><p class="document-paragraph mb-4">And Q model-theoretically entails P.</p><p class="document-paragraph mb-4">This is all very well. But it’s patently obvious that you can’t infer the truth</p><p class="document-paragraph mb-4">of P from that of Q, or vice versa. In general, model-theoretical entailment is</p><p class="document-paragraph mb-4">inferentially useless. A precondition for knowing that P entails Q is that you</p><p class="document-paragraph mb-4">know, first, that P cannot be false and, second that Q cannot be false. But if</p><p class="document-paragraph mb-4">you know this, there’s no need to infer the one from the other. What this</p><p class="document-paragraph mb-4">shows is that knowledge of model-theoretic entailments are parasitic on some</p><p class="document-paragraph mb-4">other, much more fundamental sort of entailment. And what this shows is that</p><p class="document-paragraph mb-4">knowledge of model-theoretic entailments have no significant role in the</p><p class="document-paragraph mb-4">thought-processes of any possible cogitator.</p><p class="document-paragraph mb-4">Unlike model theoretic entailment, formal entailment isn’t inferentially</p><p class="document-paragraph mb-4">useless. But our ability to make formal inferences is parasitic on our ability to</p><p class="document-paragraph mb-4">make informal inferences. Actually, so-called “formal” inferences are</p><p class="document-paragraph mb-4">informal ones.</p><p class="document-paragraph mb-4">Formal entailment is a relation that holds between expressions (more</p><p class="document-paragraph mb-4">specifically, sentences or sentence-tokens). This means that we have to know</p><p class="document-paragraph mb-4">what sentences mean to make inferences that are licensed by formal</p><p class="document-paragraph mb-4">entailments. To infer</p><p class="document-paragraph mb-4">(S1) “snow is white”</p><p class="document-paragraph mb-4">from</p><p class="document-paragraph mb-4">(S2) “snow is white and grass is green,”</p><p class="document-paragraph mb-4">I have to know what those two sentences mean, at least up to a point. I have</p><p class="document-paragraph mb-4">to know that “and” doesn’t mean what is in fact meant by “or.” I also have to</p><p class="document-paragraph mb-4">know that “snow is white” and “grass is green” are complete sentences—that</p><p class="document-paragraph mb-4">they aren’t drivel, like “bunga berka der.”</p><p class="document-paragraph mb-4">So in order to infer S1 from S2, I have to know the truth</p><p class="document-paragraph mb-4">of some proposition of the form:</p><p class="document-paragraph mb-4">(S3) given that S2 means such and such and that S1 means thus and</p><p class="document-paragraph mb-4">such, it follows that S1 is true, given that S2 is true.</p><p class="document-paragraph mb-4">But S3 is not formally true. First of all, it’s a proposition, not a sentence. But</p><p class="document-paragraph mb-4">even the corresponding sentence (the result of putting the verbiage in</p><p class="document-paragraph mb-4">question in quotation marks) isn’t formally true. It’s an analytic, logical,</p><p class="document-paragraph mb-4">informal truth.</p><p class="document-paragraph mb-4">Second reason: Formal truths, and thus formally true entailments, are</p><p class="document-paragraph mb-4">instances of universal generalizations that, although analytically true, are not</p><p class="document-paragraph mb-4">themselves formal truths. The sentence:</p><p class="document-paragraph mb-4">(S4) “if snow is white and grass is green, then snow is white”</p><p class="document-paragraph mb-4">is formally true. But why? Because</p><p class="document-paragraph mb-4">(S5) for all sentences P and Q, ‹(P and (P→Q))→P›,</p><p class="document-paragraph mb-4">though true, isn’t formally true. It instances (e.g., “if snow is white and grass</p><p class="document-paragraph mb-4">is green, then snow is white”), but not it itself. This is because it has the same</p><p class="document-paragraph mb-4">form as:</p><p class="document-paragraph mb-4">(S6) For no sentences P and Q, ‹(P and (P→Q))→P›,</p><p class="document-paragraph mb-4">which is false.</p><p class="document-paragraph mb-4">Some logicians say that, because S5 has an “all” in the place where S6 has a</p><p class="document-paragraph mb-4">“no,” they don’t have the same form. But that’s just a way of saying that they</p><p class="document-paragraph mb-4">don’t have the same form because, if they did, then S5 wouldn’t be a formal</p><p class="document-paragraph mb-4">truth anymore. It’s a fact that, in any sense of the expression “same form”</p><p class="document-paragraph mb-4">that isn’t circularly constructed to validate preexisting theories, S5 and S6</p><p class="document-paragraph mb-4">have the same form. They certainly have the same syntactic form, at least as</p><p class="document-paragraph mb-4">linguists use the word “syntax.” The rules of sentence construction involved</p><p class="document-paragraph mb-4">in the one case precisely parallel those used in the other. It’s a simple fact,</p><p class="document-paragraph mb-4">then, that S5 and S6 do not, in any significant sense, differ in form and that S5,</p><p class="document-paragraph mb-4">though true, isn’t formally so.</p><p class="document-paragraph mb-4">Given that formal truth is parasitic on informal truth, the reason being that</p><p class="document-paragraph mb-4">instances of formal truths are instances of informal ones, entailment cannot</p><p class="document-paragraph mb-4">ultimately, or even proximately, be understood in formal terms and, in</p><p class="document-paragraph mb-4">addition, only a fraction of the inferences that we make are formal. (This is</p><p class="document-paragraph mb-4">setting aside the fact noted a moment ago that so-called formal reasoning is</p><p class="document-paragraph mb-4">really informal reasoning in disguise.)</p><h3 class="text-xl font-semibold mt-8 mb-4 text-foreground">3.7 Entailment not a limiting case of confirmation</h3><p class="document-paragraph mb-4">For P to entail Q is not for P to confirm Q to the highest possible</p><p class="document-paragraph mb-4">degree.</p><p class="document-paragraph mb-4">Entailment is a logical notion. Confirmation is an explanatory notion.</p><p class="document-paragraph mb-4">For P to confirm Q to be a high degree is for (P and not-Q) to be</p><p class="document-paragraph mb-4">counter-explanatory. In other words, it is for (P and not-Q) to be false unless</p><p class="document-paragraph mb-4">deeply rooted presumptions about how the world works are uprooted and</p><p class="document-paragraph mb-4">replaced.</p><p class="document-paragraph mb-4">For P to entail Q is for (P and not-Q) to be counter-conceptual. In other</p><p class="document-paragraph mb-4">words, it is for the structures of concepts, unassisted by presumptions on our</p><p class="document-paragraph mb-4">part as to how the world works, to prohibit the falsity of Q, given the truth of</p><p class="document-paragraph mb-4">P.</p><p class="document-paragraph mb-4">Therefore, P’s confirming Q to the highest possible degree is different</p><p class="document-paragraph mb-4">from P’s entailing Q.</p><h3 class="text-xl font-semibold mt-8 mb-4 text-foreground">3.8 Entailment both an intersentential and an interpropositional relation</h3><p class="document-paragraph mb-4">Sometimes the word “entailment” refers to a relationship that holds between</p><p class="document-paragraph mb-4">propositions (sentence-meanings), and sometimes it refers to a relation that</p><p class="document-paragraph mb-4">holds between expressions of some kind. Some logicians hold that those</p><p class="document-paragraph mb-4">expressions are sentence-types. Others, myself included, hold that those</p><p class="document-paragraph mb-4">relations may hold between sentence-types and also between sentence-</p><p class="document-paragraph mb-4">tokens. (Peter Strawson (1950) was the first to distinguish token-entailment</p><p class="document-paragraph mb-4">from type-entailment. In so doing, he performed a major service for</p><p class="document-paragraph mb-4">philosophy.)</p><p class="document-paragraph mb-4">With rare exceptions (Strawson being one of them), authors who discuss</p><p class="document-paragraph mb-4">“entailment” don’t make it clear whether they are talking about a relationship</p><p class="document-paragraph mb-4">that holds between propositions, sentences, or neither.</p><p class="document-paragraph mb-4">Because this is an introductory text, we are leaving it open whether</p><p class="document-paragraph mb-4">entailment refers to</p><p class="document-paragraph mb-4">(i) an intersentential relation,</p><p class="document-paragraph mb-4">(ii) an interpropositional relation,</p><p class="document-paragraph mb-4">(iii) both,</p><p class="document-paragraph mb-4">(iv) some third notion, or</p><p class="document-paragraph mb-4">(v) all of the above</p><p class="document-paragraph mb-4">The answer is (v). We will now outline the reasons for this. (These reasons</p><p class="document-paragraph mb-4">are discussed in detail in Intermediate Set-theory and Logic.)</p><h3 class="text-xl font-semibold mt-8 mb-4 text-foreground">3.8.1 Four kinds of logical equivalence</h3><p class="document-paragraph mb-4">There are four kinds of logical equivalence:</p><p class="document-paragraph mb-4">(i) The kind that holds between propositions,</p><p class="document-paragraph mb-4">(ii) The kind that holds between sentence-tokens, and</p><p class="document-paragraph mb-4">(iii) The kind that holds between sentence-types.</p><p class="document-paragraph mb-4">(iv) The kind that holds between predicates.</p><p class="document-paragraph mb-4">The following two propositions are equivalent:</p><p class="document-paragraph mb-4">(1) Jim has 2 cars.</p><p class="document-paragraph mb-4">(1*) If n is the number of Jim’s cars, n+1=3.</p><p class="document-paragraph mb-4">(1) cannot be true unless (1*) is true, and (1*) cannot be true unless (1) is</p><p class="document-paragraph mb-4">true. In general, two propositions P and Q are equivalent iff the one cannot be</p><p class="document-paragraph mb-4">true unless the other is true.</p><p class="document-paragraph mb-4">To say of two sentence-tokens, S and S*, that they are ‘equivalent’ is to</p><p class="document-paragraph mb-4">say that, if P and P* are the propositions meant by S and S*, respectively, P is</p><p class="document-paragraph mb-4">equivalent with P*. Thus, if S is an utterance of “Jim has 2 cars” and S* is an</p><p class="document-paragraph mb-4">utterance, in the very same context, of “if n is the number of Jim’s cars,</p><p class="document-paragraph mb-4">n+1=3”, then, given that the propositions borne by S and S*are (1) and (1*),</p><p class="document-paragraph mb-4">respectively, it follows that what is meant by S is equivalent with what is</p><p class="document-paragraph mb-4">meant by S*, in the sense that what is meant by S is true just in case what is</p><p class="document-paragraph mb-4">meant by S* is true.</p><p class="document-paragraph mb-4">Sentence-types are neither true nor false. The sentence-type “I am tired”</p><p class="document-paragraph mb-4">is neither true nor false. It is particular tokens of that type that are true or</p><p class="document-paragraph mb-4">false. The meaning of that type is a rule to the effect that if somebody x utters</p><p class="document-paragraph mb-4">that sentence in a given context C, then that utterance is true exactly if, in C,</p><p class="document-paragraph mb-4">x is tired. Thus, the meaning of the sentence-type “I am tired” is a function</p><p class="document-paragraph mb-4">from contexts of utterance to propositions. The same is true of any given</p><p class="document-paragraph mb-4">sentence-type of natural language. Any given such sentence contains a tense-</p><p class="document-paragraph mb-4">marker and therefore has for its meaning a function from times of utterance to</p><p class="document-paragraph mb-4">propositions. In some cases, e.g. “2+2 equals 4”, the function in question is a</p><p class="document-paragraph mb-4">constant function: any two tokens of that sentence-type encode the same</p><p class="document-paragraph mb-4">proposition. But a function, even a constant function, from contexts of</p><p class="document-paragraph mb-4">utterance to propositions is neither true nor false. Therefore, supposing</p><p class="document-paragraph mb-4">arguendo that two sentence-types, T and T*, can be ‘equivalent’, it is not in</p><p class="document-paragraph mb-4">the same sense as S and S*. Nor, obviously, is it in the same sense as T and</p><p class="document-paragraph mb-4">T*.</p><p class="document-paragraph mb-4">That said, there is a sense in which two sentence-types can be equivalent.</p><p class="document-paragraph mb-4">Let T be the sentence-type “for any n, if triangles have n-many sides, then</p><p class="document-paragraph mb-4">n2=9”, and let T* be the sentence-type “for any n, no triangle has n-many</p><p class="document-paragraph mb-4">sides unless n+1=4.” There is a sense in which T and T* are ‘equivalent.’</p><p class="document-paragraph mb-4">They are equivalent in the sense that, the semantic rules of English semantic</p><p class="document-paragraph mb-4">being what they are, no token of T can bear a proposition that is non-</p><p class="document-paragraph mb-4">equivalent with any token of T*. So, if p1…pn are the semantic rules of</p><p class="document-paragraph mb-4">English, then to say of T and T* that they are equivalent is to say: A</p><p class="document-paragraph mb-4">consequence of p1…pn is that no proposition thereby assigned T is non-</p><p class="document-paragraph mb-4">equivalent with any proposition thereby assigned to T*.</p><p class="document-paragraph mb-4">The fourth kind of equivalence is predicate-equivalence. Consider the</p><p class="document-paragraph mb-4">following two predicates:</p><p class="document-paragraph mb-4">(a) “x is tall,”</p><p class="document-paragraph mb-4">(b) “Either x is tall or x is a square circle.”</p><p class="document-paragraph mb-4">Since “x” is a variable, neither (a) nor (b) is either true or false. But (a) and</p><p class="document-paragraph mb-4">(b) are equivalent, in the sense that the one is true for the same values of “x”</p><p class="document-paragraph mb-4">as the other.</p><p class="document-paragraph mb-4">Technically, a distinction is to be made between predicate-type</p><p class="document-paragraph mb-4">equivalence and predicate-token equivalence. And a distinction is to be made</p><p class="document-paragraph mb-4">between each of those two kinds of equivalence and propositional-schema</p><p class="document-paragraph mb-4">equivalence, a propositional-schema being what is meant by a predicate (or,</p><p class="document-paragraph mb-4">strictly speaking, predicate-token).</p><h3 class="text-xl font-semibold mt-8 mb-4 text-foreground">3.9 The irrelevance of formal logic to thought</h3><p class="document-paragraph mb-4">For reasons that were discussed in Chapters 1, 7, and 18 of Analytic</p><p class="document-paragraph mb-4">Philosophy, any assistance that knowledge of formal logic can provide one in</p><p class="document-paragraph mb-4">the way of acquiring knowledge is parasitic on one’s knowledge of informal</p><p class="document-paragraph mb-4">analytic truths. This has nothing to do with the idiosyncrasies of human</p><p class="document-paragraph mb-4">psychology. It’s an epistemological consequence of a strictly logical point.</p><p class="document-paragraph mb-4">Given any open-sentence (or open-proposition) all of whose instances are</p><p class="document-paragraph mb-4">true, for example:</p><p class="document-paragraph mb-4">(1) ‹(P and (P→Q))→Q›,</p><p class="document-paragraph mb-4">the fact that it’s true for all its instances is a consequence of the fact that some</p><p class="document-paragraph mb-4">informal truth holds—for example:</p><p class="document-paragraph mb-4">(2) given any two propositions P and Q, ‹(P and (P→Q))→Q›).</p><p class="document-paragraph mb-4">It must be stressed that (2) is an informal truth. (2) has the same form as</p><p class="document-paragraph mb-4">the false statement that:</p><p class="document-paragraph mb-4">(2#) given no two propositions P and Q, ‹(P and (P→Q))→Q›).</p><p class="document-paragraph mb-4">Nothing that has the same form as a false statement is formally true.</p><p class="document-paragraph mb-4">Therefore, (2), though true, isn’t formally so. (2#) is a statement about a class</p><p class="document-paragraph mb-4">of formal truths; but, like most statements about formal truths, it is not itself a</p><p class="document-paragraph mb-4">formal truth.</p><p class="document-paragraph mb-4">Bearing this in mind, consider the following statement, which, unlike (2),</p><p class="document-paragraph mb-4">is formally true:</p><p class="document-paragraph mb-4">(3) “if snow is white, and (if snow is white then snow is not pink), then</p><p class="document-paragraph mb-4">snow is not pink).”</p><p class="document-paragraph mb-4">There are two different reasons why one might accept (3). One is that one</p><p class="document-paragraph mb-4">knows it to be an instance of (1) and one accepts it for that reason. But in that</p><p class="document-paragraph mb-4">case, one is accepting (3) on the grounds that it’s a consequence of (2). Since</p><p class="document-paragraph mb-4">(2) is informal, one’s acceptance of (3), under those circumstances embodies</p><p class="document-paragraph mb-4">knowledge of an informal truth.</p><p class="document-paragraph mb-4">The same thing holds if one’s acceptance of (3) is based on one’s</p><p class="document-paragraph mb-4">understanding of the concepts meant by the expressions composing it.</p><p class="document-paragraph mb-4">Suppose that your reason for accepting (3) is that, given your understanding</p><p class="document-paragraph mb-4">of the concept expressed by “if...then...,” you know that it would be absurd to</p><p class="document-paragraph mb-4">deny (3). In that case, your acceptance of (3) is based on your knowledge</p><p class="document-paragraph mb-4">that, the structure of that concept being what it is, any proposition of that</p><p class="document-paragraph mb-4">form must be true. Thus, your acceptance of (3) is based on your acceptance</p><p class="document-paragraph mb-4">of (2). Given that (2) is an informal truth, your acceptance of (3) under those</p><p class="document-paragraph mb-4">circumstances constitutes informal knowledge. There is no circumstance,</p><p class="document-paragraph mb-4">therefore, under which your knowledge of (3) is any sense formal. The</p><p class="document-paragraph mb-4">concept of “formal” (or “mechanical”) thought is therefore an incoherent one.</p><h3 class="text-xl font-semibold mt-8 mb-4 text-foreground">4.0 Models</h3><p class="document-paragraph mb-4">An open-sentence is an expression that contains a free variable, and is</p><p class="document-paragraph mb-4">therefore neither true nor false, but is otherwise just like a sentence. So ‹x is</p><p class="document-paragraph mb-4">an even number› is an open-sentence, since it contains a variable (“x”) where</p><p class="document-paragraph mb-4">there should be a “2” or a “4” or some such. It often happens that, given a set</p><p class="document-paragraph mb-4">of one or more open-sentences, we wish to find some way of replacing the</p><p class="document-paragraph mb-4">variables with constants that yield true sentences. For example, let S1 be the</p><p class="document-paragraph mb-4">set containing the following two open-sentences (I’ll henceforth omit the use</p><p class="document-paragraph mb-4">of quasi-quotation marks):</p><p class="document-paragraph mb-4">(1)  x is an even number that is greater than zero.</p><p class="document-paragraph mb-4">(2)  x is less than 20.</p><p class="document-paragraph mb-4">If we assign the number two or the number four to x, the result is that both</p><p class="document-paragraph mb-4">sentences are true. So each of these assignments validates S1.</p><p class="document-paragraph mb-4">In general, given a set of open-sentences, an assignment of constants to the</p><p class="document-paragraph mb-4">free variables validates that set iff two conditions are met. First, that</p><p class="document-paragraph mb-4">assignment turns each open-sentence in that set into an actual sentence.</p><p class="document-paragraph mb-4">Second, every sentence is true.</p><p class="document-paragraph mb-4">An assignment of constants to a set of open-sentences is an interpretation</p><p class="document-paragraph mb-4">of that set. An interpretation of such a set validates it iff, under that</p><p class="document-paragraph mb-4">interpretation, every sentence in that set comes out true.</p><p class="document-paragraph mb-4">Let S2 be the set containing only the following open</p><p class="document-paragraph mb-4">sentences:</p><p class="document-paragraph mb-4">(1) x is an odd number.</p><p class="document-paragraph mb-4">(2) x2 is greater than 80.</p><p class="document-paragraph mb-4">(3) root-x is irrational.</p><p class="document-paragraph mb-4">If we assign the number nine to x, (1) and (2) come out true; but (3) does</p><p class="document-paragraph mb-4">not. But if we assign the number 13 to x, (1)–(3) all come out true. (It is</p><p class="document-paragraph mb-4">assumed that the universe of discourse is the set of numbers. This assumption</p><p class="document-paragraph mb-4">will continue to be made until further notice.)</p><p class="document-paragraph mb-4">An assignment of constants to such a set of open-sentences is an</p><p class="document-paragraph mb-4">interpretation of that set. Not all such sets are validated by all interpretations</p><p class="document-paragraph mb-4">of them, as we just saw.</p><p class="document-paragraph mb-4">False interpretations must be distinguished from partial interpretations. A</p><p class="document-paragraph mb-4">partial interpretation is one that is incomplete but is correct as far as it goes.</p><p class="document-paragraph mb-4">Let S3 be the set containing only the following open-sentences:</p><p class="document-paragraph mb-4">(1) x is a phi.</p><p class="document-paragraph mb-4">(2) x is larger than y.</p><p class="document-paragraph mb-4">(3) y is a phi.</p><p class="document-paragraph mb-4">(4) y is a psi.</p><p class="document-paragraph mb-4">If we assign the numbers 10 and 8 is to x and y respectively, and the property</p><p class="document-paragraph mb-4">of being even to “phi,” we’ve partially interpreted S3, since, under that</p><p class="document-paragraph mb-4">interpretation, (1)–(3) come out true. But since we haven’t yet assigned a</p><p class="document-paragraph mb-4">meaning to “psi,” we haven’t completely interpreted it. We have completely</p><p class="document-paragraph mb-4">interpreted that set of open sentences if we make the further stipulation that</p><p class="document-paragraph mb-4">for a thing to be a psi is for it to have the property of being less than 9. In</p><p class="document-paragraph mb-4">fact, supposing that we make that additional stipulation, we have provided a</p><p class="document-paragraph mb-4">complete interpretation of them that validates them. If we had instead</p><p class="document-paragraph mb-4">stipulated that for a thing to be a psi is for it to be less than 5, we would have</p><p class="document-paragraph mb-4">provided a complete interpretation of those open sentences that failed to</p><p class="document-paragraph mb-4">validate them.</p><p class="document-paragraph mb-4">Oftentimes, the interpretations that are of interest are very abstract ones.</p><p class="document-paragraph mb-4">Let S4 be the set containing just the following open-sentences:</p><p class="document-paragraph mb-4">(1) x is a phi.</p><p class="document-paragraph mb-4">(2) x bears R to y.</p><p class="document-paragraph mb-4">(3) y is a psi.</p><p class="document-paragraph mb-4">(3) R is “reflexive” (any given thing bears R to itself).</p><p class="document-paragraph mb-4">(4) y bears R to z.</p><p class="document-paragraph mb-4">(5) z is a phi.</p><p class="document-paragraph mb-4">(6) R is “transitive” (if a bears it to b, and b bears it to c, then a bears it to</p><p class="document-paragraph mb-4">c).</p><p class="document-paragraph mb-4">Here’s an interpretation of S4. x, y, and z are, respectively, the numbers two,</p><p class="document-paragraph mb-4">three, and four. Phi and psi, respectively, are the properties of being even and</p><p class="document-paragraph mb-4">odd. R is the less relation of being less than or equal to. y is the number.</p><p class="document-paragraph mb-4">Question: Does the following set (S5) have an</p><p class="document-paragraph mb-4">interpretation that validates it? If so, what is it?</p><p class="document-paragraph mb-4">(1) x is a phi.</p><p class="document-paragraph mb-4">(2) x bears R to y.</p><p class="document-paragraph mb-4">(3) Anything that bears R to anything bears R to itself.</p><p class="document-paragraph mb-4">(4) y bears R to z.</p><p class="document-paragraph mb-4">(5) Nothing bears R to anything that has phi.</p><p class="document-paragraph mb-4">Some sets of open-sentences are true under all interpretations of them. An</p><p class="document-paragraph mb-4">example is the set containing: “x is identical with x” and “if, for some phi, x</p><p class="document-paragraph mb-4">has phi and y does not have phi, then x is not identical with y.” Others (e.g.,</p><p class="document-paragraph mb-4">any set containing “x is not identical with x”) are true under none.</p><p class="document-paragraph mb-4">Any interpretation of a set of the first kind is a formal truth. Thus “JMK is</p><p class="document-paragraph mb-4">identical with JMK, and anything identical with a professor is identical to</p><p class="document-paragraph mb-4">nothing that isn’t a professor” is a formal truth.</p><h3 class="text-xl font-semibold mt-8 mb-4 text-foreground">5.0 Proof that all knowledge is inferential</h3><p class="document-paragraph mb-4">The objects of knowledge are truths (e.g. 2+2=4), not things (stable-</p><p class="document-paragraph mb-4">patterns of mass-energy displacements, e.g. rocks, trees, stars). One is aware</p><p class="document-paragraph mb-4">of things; one does not in the relevant sense know them. (In Spanish, German,</p><p class="document-paragraph mb-4">and French, there is one word for truth-knowledge (saber, wissen, savoir) and</p><p class="document-paragraph mb-4">a different one for thing-knowledge (conocer, kennen, connaître). It is truths,</p><p class="document-paragraph mb-4">and truths alone, that one knows.</p><p class="document-paragraph mb-4">We obviously acquire a great deal of knowledge on the basis of sensory</p><p class="document-paragraph mb-4">observation. But because it is states of affairs (these being compendia of</p><p class="document-paragraph mb-4">things: rocks, trees, and the like), not truths, that are the objects of sensory</p><p class="document-paragraph mb-4">observation, the contents of our observations must be converted into</p><p class="document-paragraph mb-4">propositions if those observations are to avail us of knowledge, as opposed to</p><p class="document-paragraph mb-4">mere awareness.</p><p class="document-paragraph mb-4">The conversion of non-propositional (observational, objectual) content into</p><p class="document-paragraph mb-4">propositional content involves knowledge of relations R1…Rn between non-</p><p class="document-paragraph mb-4">propositional data-sets, on the one hand, and propositions, on the other,</p><p class="document-paragraph mb-4">whereby, given such and such data-sets, R1…Rn warrant the acceptance of</p><p class="document-paragraph mb-4">thus and such propositions. R1…Rn cannot possibly be given by empirical</p><p class="document-paragraph mb-4">propositions (propositions known on the basis of sense-perception), since it is</p><p class="document-paragraph mb-4">only if we first know R1…Rn that observation can avail us of any knowledge.</p><p class="document-paragraph mb-4">Therefore,</p><p class="document-paragraph mb-4">(i) R1…Rn are analytic truths, and</p><p class="document-paragraph mb-4">(ii) Our knowledge of R1…Rn is a priori, meaning that</p><p class="document-paragraph mb-4">said knowledge is constitutive of our ability to acquire</p><p class="document-paragraph mb-4">knowledge.</p><p class="document-paragraph mb-4">Thus, Kant’s contention that we have a priori knowledge is correct, and</p><p class="document-paragraph mb-4">Leibniz’s contention that there are analytic truths is also correct.</p><h3 class="text-xl font-semibold mt-8 mb-4 text-foreground">5.1 Proof that some truths are non-empirical</h3><p class="document-paragraph mb-4">A truth is non-empirical if it cannot be known on the basis of sensory</p><p class="document-paragraph mb-4">observation. A proposition is “analytic” if its own structure guarantees its</p><p class="document-paragraph mb-4">truth. All non-empirical truths are analytic and vice versa.</p><p class="document-paragraph mb-4">Proof that not all truths are empirical and that not all knowledge is strictly</p><p class="document-paragraph mb-4">observation-based: The proposition that</p><p class="document-paragraph mb-4">(1) All truth is empirical truth</p><p class="document-paragraph mb-4">is true exactly if</p><p class="document-paragraph mb-4">(2) The class K of non-empirical truths is empty.</p><p class="document-paragraph mb-4">(2) cannot be known to be true on empirical grounds, since it concerns the</p><p class="document-paragraph mb-4">scope of what cannot be known on such grounds. So (1) is not true unless it is</p><p class="document-paragraph mb-4">a non-empirical truth. And if (1) it is non-empirical truth, then (1) is false.</p><p class="document-paragraph mb-4">Therefore, it is false.</p><p class="document-paragraph mb-4">It follows that there are analytic truths (e.g. the negation of 1), and also</p><p class="document-paragraph mb-4">that we have knowledge of analytic truths (e.g. our knowledge of the</p><p class="document-paragraph mb-4">negation of 1).</p><h3 class="text-xl font-semibold mt-8 mb-4 text-foreground">6.0 Set-theoretic characterizations of truth, meaning, and entailment</h3><p class="document-paragraph mb-4">Truths are true propositions. A proposition is a class of properties. More</p><p class="document-paragraph mb-4">precisely, a given proposition P is the smallest class of properties p1…pn such</p><p class="document-paragraph mb-4">that</p><p class="document-paragraph mb-4">(i) P is true exactly if p1…pn are jointly instantiated and</p><p class="document-paragraph mb-4">(ii) It must be assumed that p1…pn are P’s constituents, lest P’s inferential</p><p class="document-paragraph mb-4">properties be inexplicable.</p><p class="document-paragraph mb-4">Let P be the proposition Sam is smart. P is true exactly if the following</p><p class="document-paragraph mb-4">properties are instantiated:</p><p class="document-paragraph mb-4">p1: The property of being identical with Sam.</p><p class="document-paragraph mb-4">p2: The property of being smart.</p><p class="document-paragraph mb-4">p3: The property of being a thing x such that x=Sam and x is smart.</p><p class="document-paragraph mb-4">Of course, P is true exactly p3 by itself is instantiated. (This is consistent</p><p class="document-paragraph mb-4">with our analysis, since, if p3 instantiated, so are p1 and p2. ) But p1 and p2</p><p class="document-paragraph mb-4">must be reckoned as being among the constituents of P. This is because P’s</p><p class="document-paragraph mb-4">composition must parallel that of the sentence “Sam is tall.” For P is by</p><p class="document-paragraph mb-4">definition the meaning of (that which is expressed by) the sentence “Sam is</p><p class="document-paragraph mb-4">tall” (henceforth “S”); and S’s constituents (setting aside the tense-marker,</p><p class="document-paragraph mb-4">which is not important in this context) are</p><p class="document-paragraph mb-4">(1) “Sam”</p><p class="document-paragraph mb-4">(2) “is tall” (or, more accurately, “x is tall”---the “x”,</p><p class="document-paragraph mb-4">though typically orthographically suppressed, always</p><p class="document-paragraph mb-4">being semantically present), and</p><p class="document-paragraph mb-4">(3) “Sam is tall.”</p><p class="document-paragraph mb-4">If it is assumed that P’s composition parallels S’s, then P must be assumed</p><p class="document-paragraph mb-4">to be a set whose members p1,  p2, and p3. And unless P’s composition is</p><p class="document-paragraph mb-4">assumed to parallel S’s, it is impossible to explain P’s inferential properties.</p><p class="document-paragraph mb-4">For example, when it is said, as it sometimes is, that the proposition (not the</p><p class="document-paragraph mb-4">sentence)</p><p class="document-paragraph mb-4">(P2) something is smart</p><p class="document-paragraph mb-4">is a formal consequence of P, this can be taken to mean that:</p><p class="document-paragraph mb-4">(P3) Being a member of P, p2 cannot be instantiated unless P is true.</p><p class="document-paragraph mb-4">In general, cases of formal entailment among propositions can be</p><p class="document-paragraph mb-4">identified with cases of set-membership. (Formal entailment among sentences</p><p class="document-paragraph mb-4">is an entirely different matter.) Given two propositions p and q, p formally</p><p class="document-paragraph mb-4">entails q if q is a member or the property-class with which p is identical.</p><p class="document-paragraph mb-4">p informally entails q if</p><p class="document-paragraph mb-4">(a) q is not a member of p, but</p><p class="document-paragraph mb-4">(b) There is some property class Q such that q is a</p><p class="document-paragraph mb-4">member of Q and, moreover, the members of Q are</p><p class="document-paragraph mb-4">jointly instantiated just in case the members of p are</p><p class="document-paragraph mb-4">jointly instantiated.</p><p class="document-paragraph mb-4">For example,</p><p class="document-paragraph mb-4">(P4) Sam is both sentient (aware, but not necessarily</p><p class="document-paragraph mb-4">truth-aware) and sapient (truth-aware, as opposed to</p><p class="document-paragraph mb-4">object-aware)</p><p class="document-paragraph mb-4">is an informal consequence of P. x is sentient is not a constituent of P. But x</p><p class="document-paragraph mb-4">is sentient is a constituent of many a proposition Q that is equivalent with P,</p><p class="document-paragraph mb-4">e.g.</p><p class="document-paragraph mb-4">(P5) Sam is sentient, sapient, and, relative to other</p><p class="document-paragraph mb-4">sapient creatures, exceptionally adept at processing</p><p class="document-paragraph mb-4">information.</p><p class="document-paragraph mb-4">Not only is P5 a consequence of P; P is a consequence of P5. They are</p><p class="document-paragraph mb-4">equivalent, since each is an informal consequence of the other.</p><p class="document-paragraph mb-4">In general, if P then Q is necessarily true if the members of P cannot be</p><p class="document-paragraph mb-4">jointly instantiated unless the members of Q are jointly instantiated, and it is</p><p class="document-paragraph mb-4">formally true if the members of Q are subset of the members of P.</p><p class="document-paragraph mb-4">The sequel to the present volume contains an analysis of molecular</p><p class="document-paragraph mb-4">propositions (propositions that are either quantified generalizations or that</p><p class="document-paragraph mb-4">contain other propositions as proper parts), which, though a natural extension</p><p class="document-paragraph mb-4">of the just-stated analysis, is not an obvious such extension. The sequel also</p><p class="document-paragraph mb-4">contains rigorous and general analyses of function, recursion, number, formal</p><p class="document-paragraph mb-4">language, continuity, and dimensionality. We will now put forth rough and</p><p class="document-paragraph mb-4">ready analyses of these concepts, it being the purpose of the sequel to this</p><p class="document-paragraph mb-4">text to justify as well as refine these analyses.</p><p class="document-paragraph mb-4">7.0 Outline of the contents of the sequel to this volume</p><h3 class="text-xl font-semibold mt-8 mb-4 text-foreground">7.1 Function</h3><p class="document-paragraph mb-4">A function is a rule that assigns no more than one output to any given</p><p class="document-paragraph mb-4">input. A function therefore generates, and may therefore be identified with, a</p><p class="document-paragraph mb-4">class K of ordered pairs such that if (x,y) and (x,z) both belong to K, then</p><p class="document-paragraph mb-4">y=z.</p><p class="document-paragraph mb-4">A function of more than one variable can be represented as a function</p><p class="document-paragraph mb-4">one variable, where that variable is an ordered n-tuple. Thus, the addition</p><p class="document-paragraph mb-4">function can be regarded as a function of two variables (e.g. one that assigns</p><p class="document-paragraph mb-4">7 to 3 when the value of the other independent variable is 4) or as a function</p><p class="document-paragraph mb-4">of one variable (one that assigns 7 to (3,4)).</p><h3 class="text-xl font-semibold mt-8 mb-4 text-foreground">7.2 Recursive definition</h3><p class="document-paragraph mb-4">A recursive definition is one to the effect that some class K is the</p><p class="document-paragraph mb-4">posterity of α with respect to R, for some α and some ordering relation R.</p><p class="document-paragraph mb-4">R is an ordering relation if R with respect to K if, for any members x, y,</p><p class="document-paragraph mb-4">and z of K, ¬xRx (x doesn’t bear R to itself: R is non-reflexive), asymmetric</p><p class="document-paragraph mb-4">(xRy→¬yRx) (y doesn’t bear R to x if x bears R to x: R is asymmetric) and</p><p class="document-paragraph mb-4">(xRy→(yRz→xRz) (x bears to whenever y bears R to z and x bears R to y: R</p><p class="document-paragraph mb-4">is transitive).</p><p class="document-paragraph mb-4">K is the posterity of α with respect to R if K is the smallest class such</p><p class="document-paragraph mb-4">that</p><p class="document-paragraph mb-4">(i) α ∈K, and</p><p class="document-paragraph mb-4">(ii) δ ∈K whenever βRδ,</p><p class="document-paragraph mb-4">where β ∈K.</p><h3 class="text-xl font-semibold mt-8 mb-4 text-foreground">7.3 Cardinals, rationals, and reals</h3><p class="document-paragraph mb-4">A cardinal number is the size of a class. The meaning of</p><p class="document-paragraph mb-4">(a) Jim has 3 houses</p><p class="document-paragraph mb-4">is</p><p class="document-paragraph mb-4">(b) K has 3 members,</p><p class="document-paragraph mb-4">where K is the class of Jim’s houses.</p><p class="document-paragraph mb-4">The class ℕof cardinal numbers is defined inductively: x belongs to ℕ</p><p class="document-paragraph mb-4">iff either</p><p class="document-paragraph mb-4">(A) x=0 or</p><p class="document-paragraph mb-4">(B) x=n+1,</p><p class="document-paragraph mb-4">where n ∈ℕ.</p><p class="document-paragraph mb-4">Given a class K, K has 0 members if, for all x, x ∉K; and K has n+1</p><p class="document-paragraph mb-4">members if, for some y such that y ∈K, any class K* has n members if</p><p class="document-paragraph mb-4">y ∉K* but K* otherwise has the same members as K.</p><p class="document-paragraph mb-4">ℚcan be recursively defined, where ℚis the class of rationals, since the</p><p class="document-paragraph mb-4">members of ℚ are the members of the posterity of k2 with respect to ρ, where</p><p class="document-paragraph mb-4">kn is the class of all rationals (with denominator n>0) having index n,</p><p class="document-paragraph mb-4">meaning that kn={p/q: p+q=n} (e.g. k5={1/4,4/1,2/3,3/2}, and where ρ is the</p><p class="document-paragraph mb-4">relation borne by km to km+1, for arbitrary m.</p><p class="document-paragraph mb-4">Equivalently, ℚ is the smallest class whose members occurring on the</p><p class="document-paragraph mb-4">following series:</p><p class="document-paragraph mb-4">1/1, ½, 2/1, 1/3, 3/1, 2/2, ¼, 4/1, 2/3, 3/2,…</p><p class="document-paragraph mb-4">The reals cannot be recursively defined since, given any list L of real</p><p class="document-paragraph mb-4">numbers (represented as repeating decimals), D(L) ∉L, where D(L) is the</p><p class="document-paragraph mb-4">number that results when, if x is the figure n the nth decimal place of the nth</p><p class="document-paragraph mb-4">member of L, x is replaced with x+1 when x<9 and x is replaced with 0 when</p><p class="document-paragraph mb-4">x=9.</p><p class="document-paragraph mb-4">ℝ is the class that contains every rational, along with every number that</p><p class="document-paragraph mb-4">is the limit of an initial segment of ( ℚ,<), where ( ℚ,<) is the series rationals</p><p class="document-paragraph mb-4">arranged from lesser to greater. An initial segment of ( ℚ,<) is one that</p><p class="document-paragraph mb-4">doesn’t contain a given rational unless it contains every smaller rational.</p><h3 class="text-xl font-semibold mt-8 mb-4 text-foreground">7.4 Formal languages</h3><p class="document-paragraph mb-4">A formal language is a recursively defined expression-class.</p><p class="document-paragraph mb-4">If K is a class of truths, K can be formalized if there is some formal</p><p class="document-paragraph mb-4">language L such that, for some t, t ∈K whenever s ∈L, where t is the</p><p class="document-paragraph mb-4">meaning of s.</p><p class="document-paragraph mb-4">Therefore, a class K of truths can be formalized exactly if K can be</p><p class="document-paragraph mb-4">recursively defined.</p><h3 class="text-xl font-semibold mt-8 mb-4 text-foreground">7.5 Incompleteness</h3><p class="document-paragraph mb-4">Any given recursive definition generates a discrete series (a series each</p><p class="document-paragraph mb-4">of whose members has an immediate successor). If S and S* are any two</p><p class="document-paragraph mb-4">discrete series, S and S* are isomorphic, meaning that any truth concerning</p><p class="document-paragraph mb-4">the relation of any S-member x to any S-member y is equivalent to some</p><p class="document-paragraph mb-4">truth about some S*-member x* to some S*-member y*.</p><p class="document-paragraph mb-4">Any given discrete series is isomorphic with ( ℕ,<), this being the</p><p class="document-paragraph mb-4">series: 0,1,2,3,…</p><p class="document-paragraph mb-4">Therefore, any given recursive definition, and therefore any</p><p class="document-paragraph mb-4">uninterpreted calculus (any formal language), is modeled by a structure that is</p><p class="document-paragraph mb-4">structure-identical with ℕ.</p><p class="document-paragraph mb-4">This means that ( ℕ,<) is a model of any formal language L of which</p><p class="document-paragraph mb-4">( ℝ,<) is also a model.</p><p class="document-paragraph mb-4">This means that there is no way to formalize arithmetic, since ( ℝ,<) is</p><p class="document-paragraph mb-4">described by a subset of the class of arithmetical truths.</p><p class="document-paragraph mb-4">This means that any consistent model of arithmetic is incomplete.</p><h3 class="text-xl font-semibold mt-8 mb-4 text-foreground">7.6 Axiom-sets in relation to incompleteness</h3><p class="document-paragraph mb-4">An axiom-set is a finite class of sentence-schema. A sentence-schema</p><p class="document-paragraph mb-4">(plural: schemata) is an expression that contains a free variable, and is</p><p class="document-paragraph mb-4">therefore neither true nor false, but is otherwise just like a sentence. x is tall is</p><p class="document-paragraph mb-4">a sentence-schema. Other examples of sentence-schemata are: x has ��, x</p><p class="document-paragraph mb-4">bears R to y, and P or not-P.</p><p class="document-paragraph mb-4">An axiom is a member of an axiom-set.</p><p class="document-paragraph mb-4">An axiom is neither true nor false, since an axiom is a sentence-schema</p><p class="document-paragraph mb-4">and sentence-schemata are neither true nor false.</p><p class="document-paragraph mb-4">Given a class K of sentence-schemata, K* is a model of K if, for any</p><p class="document-paragraph mb-4">member s* of K*, there is some member s of K such that s* is the result of</p><p class="document-paragraph mb-4">coupling s with a specific meaning.</p><p class="document-paragraph mb-4">A class K* of truths can be formalized if, and only if, K* is the model</p><p class="document-paragraph mb-4">of a class K sentence-schemata all of whose models are isomorphic with each</p><p class="document-paragraph mb-4">other. If, for any class K of sentence-schemata modelled by a class K* of</p><p class="document-paragraph mb-4">truths, there are non-isomorphic models, then K* cannot be formalized. If, for</p><p class="document-paragraph mb-4">some such class K, any models of K are isomorphic, then K* can be</p><p class="document-paragraph mb-4">formalized.</p><p class="document-paragraph mb-4">If K ℝmodels a recursively defined class K of sentence-schemata, where</p><p class="document-paragraph mb-4">K ℝcontains the arithmetic of real numbers, K ℕalso models K, where</p><p class="document-paragraph mb-4">K ℕcontains the arithmetic of cardinals but not of reals. There is no one-one</p><p class="document-paragraph mb-4">correspondence between K ℝ, and K ℕ. Therefore, K ℕ is not isomorphic with</p><p class="document-paragraph mb-4">K ℝ. Therefore, K ℝ cannot be formalized.</p><h3 class="text-xl font-semibold mt-8 mb-4 text-foreground">7.7 Compactness vs. continuity</h3><p class="document-paragraph mb-4">A series S is compact if it is not discrete. ( ℚ,<) is compact. S is</p><p class="document-paragraph mb-4">continuous if it contains each of its own limiting points. ( ℝ,<) is continuous.</p><p class="document-paragraph mb-4">( ℚ,<) is not continuous.</p><p class="document-paragraph mb-4">Continuous series are always compact, but compact series are not</p><p class="document-paragraph mb-4">always continuous.</p><h3 class="text-xl font-semibold mt-8 mb-4 text-foreground">7.8 Set-measure</h3><p class="document-paragraph mb-4">The measure of a class K is minimal if K has n-many members, for</p><p class="document-paragraph mb-4">some n≤ℵ0, where ℵ0-many is the number of members of any class that can</p><p class="document-paragraph mb-4">be recursively defined.</p><p class="document-paragraph mb-4">The measure of a class is nil if K has no members.</p><p class="document-paragraph mb-4">The measure of a non-empty class is non-minimal if K has ℵ1-many</p><p class="document-paragraph mb-4">members, where ℵ1 is the number of members of ℝ.</p><p class="document-paragraph mb-4">The values of direct measurements are always given by rational</p><p class="document-paragraph mb-4">numbers. But given two direct measurements whose values are m1 and m2, it</p><p class="document-paragraph mb-4">may follow that m3 is irrational. For example, the length of  m3 = √2 units</p><p class="document-paragraph mb-4">when m3 the length of the hypotenuse of a right triangle  each of whose other</p><p class="document-paragraph mb-4">sides have been shown through direct measurement to have a length of one</p><p class="document-paragraph mb-4">unit.</p><p class="document-paragraph mb-4">If M1 and M2 are the numbers corresponding any two distinct lengths</p><p class="document-paragraph mb-4">(or velocities or masses or volumes…), there are infinitely many irrational</p><p class="document-paragraph mb-4">numbers M3 in between M1 and M2. Therefore, if φ is any degree property</p><p class="document-paragraph mb-4">(e.g. length, mass, volume), the degree to which x has φ cannot change at all</p><p class="document-paragraph mb-4">without assuming infinitely many irrational values. It follows that the number</p><p class="document-paragraph mb-4">of any class K that does not contain irrationals is too small to be the measure</p><p class="document-paragraph mb-4">of any magnitude that is had to any degree other than an infinitesimally small</p><p class="document-paragraph mb-4">one, this being why a class whose cardinality is n, where 0≤n≤ℵ0, is</p><p class="document-paragraph mb-4">minimal (but not nil).</p><p class="document-paragraph mb-4">Equivalently, measurement is neither identical nor identifiable with</p><p class="document-paragraph mb-4">enumeration. To enumerate a class is to assign each of its members an</p><p class="document-paragraph mb-4">integer, on the condition no two members are assigned the same integer.</p><p class="document-paragraph mb-4">Since [ ℚ]=[ ℕ], where [k] is k’s cardinality, ℚis as measurement-useless</p><p class="document-paragraph mb-4">as ℕ. And since [ ℝ] is by definition the number of the smallest non-</p><p class="document-paragraph mb-4">measurement-useless class, it follows that the values of direct and indirect</p><p class="document-paragraph mb-4">measurement are always real numbers.</p><h3 class="text-xl font-semibold mt-8 mb-4 text-foreground">7.9 Nil vs. infinitesimal</h3><p class="document-paragraph mb-4">Real numbers are degrees. Cardinals are class-sizes. Rationals are</p><p class="document-paragraph mb-4">relations between class sizes. (m/n is the relation that x bears to y when</p><p class="document-paragraph mb-4">x×n=y×m.)</p><p class="document-paragraph mb-4">Given an event e, when it is said that p(e)=0, where p(e) is the</p><p class="document-paragraph mb-4">probability of e, this is ambiguous, as it could mean either</p><p class="document-paragraph mb-4">(A) e’s probability is nil or</p><p class="document-paragraph mb-4">(B) e’s probability is minimal but not nil.</p><p class="document-paragraph mb-4">Given some quarter C and some surface S larger than C on which C is</p><p class="document-paragraph mb-4">being dropped, there are ℵ1-many regions on S that C can occupy. Therefore,</p><p class="document-paragraph mb-4">the probability that C will occupy this or that specific region is less than any</p><p class="document-paragraph mb-4">positive amount, since 1/ ℵ1 is less than any positive rational. But there is</p><p class="document-paragraph mb-4">some region R such that C does occupy.</p><p class="document-paragraph mb-4">p(e) is minimal but not nil, where e is C’s occupying R, for some</p><p class="document-paragraph mb-4">specific region R. Equivalently, 0C≠OR, where 0C  is cardinal 0 and 0R is real</p><p class="document-paragraph mb-4">0.</p><p class="document-paragraph mb-4">A magnitude is 0R if that magnitude’s degree is 0. If D is a given</p><p class="document-paragraph mb-4">magnitude’s degree, D is 0 if D≤ℵ0. Probabilities are given by degrees, like</p><p class="document-paragraph mb-4">mass and length. If probabilities were given by enumerable quantities, it</p><p class="document-paragraph mb-4">would indeed be a paradox that there should occur events of probability 0.</p><h3 class="text-xl font-semibold mt-8 mb-4 text-foreground">7.10 Dimensionality</h3><p class="document-paragraph mb-4">S is a 1-dimensional series if S is a continuous series whose members</p><p class="document-paragraph mb-4">are non-series. S is an n+1-dimensional series if S is a series whose members</p><p class="document-paragraph mb-4">are n-dimensional series.</p><p class="document-paragraph mb-4">Fin</p></div>`
    }
  ],
  fullText: `Introduction to Symbolic Logic
J.-M. Kuczynski
1.0 The concept of an inference
1.1 Inductive inference vs. deductive inference
1.2 Deduction in relation to entailment
1.3 Induction in relation to confirmation
1.4 Validity vs. soundness
1.5 Two kinds of induction
1.6 A fact about induction by enumeration
1.7 Two kinds of entailment
2.0 Some notational conventions relevant to formal logic
Biconditionals and “↔”
Parentheses as indicators of scope
Negation
Negation in relation to the use of parentheses
The modal operators—the box and the pound sign
The non-exclusive meaning of “or”
The Sheffer Stroke
Compatibility and incompatibility
2.1 Some general principles relevant to formal logic
Modality
2.3 Principles and theorems of formal logic

3.0 Some meta-logical principles: Model theoretic entailment
3.1 Formal entailment
3.2 Formal entailment a relation between expressions
3.3 The one genuinely important kind of entailment: The informal, non-
model-theoretic kind
3.5 The ampliative character of deduction
3.6 The most important kind of entailment: the non-formal, non-model
theoretic kind
3.7 Entailment not a limiting case of confirmation
3.8 Entailment both an intersentential and an interpropositional relation
3.8.1 Four kinds of logical equivalence
3.9 The irrelevance of formal logic to thought
4.0 Models
5.0 Proof that all knowledge is inferential
5.1 Proof that some truths are non-empirical
6.0 Set-theoretic characterizations of truth, meaning, and entailment
7.0 Outline of the contents of the sequel to this volume
7.1 Function
7.2 Recursive definition
7.3 Cardinals, rationals, and reals
7.4 Formal languages
7.5 Incompleteness
7.6 Axiom-sets in relation to incompleteness
7.7 Compactness vs. continuity

7.8 Set-measure
7.9 Nil vs. infinitesimal
7.10 Dimensionality
1.0 The concept of an inference
To make an inference is to form a new belief on the basis of an old one. Here
is an example. My friend Larry has been evicted from his apartment. I let him
stay with me until he finds a new place to live. I notice that, shortly after
Larry moves in, all of my money and valuables start disappearing. I also
notice that purchases that I didn’t make are appearing on my credit card bills.
I know that nobody other than Larry had access to my money, valuables, and
credit cards. So I infer that Larry has stolen my money and valuables and
illicitly used my credit cards.
Inferential knowledge is indirect knowledge. Non-inferential knowledge is
direct knowledge. There is some reason to believe that all knowledge is
inferential. (This issue is discussed in Section 5.) In any case, it’s clear that
some knowledge is relatively direct. My knowledge that I am now typing on
a keyboard is more direct than my knowledge that heat is molecular motion.
1.1 Inductive inference vs. deductive inference
A premise is a belief that one either has or is willing to accept for
argument’s sake. An inference always begins with certain premises and ends
with a conclusion that one accepts on the basis of those premises. An
inference is legitimate if the premises warrants acceptance of the conclusion.
There are two very different reasons why acceptance of P might warrant
acceptance of Q. On the one hand, it might be impossible, for reasons of a
strictly logical nature, that Q should be false if P is true. (P: Smith owns 127
cars. Q: Smith owns more than 100 cars.) On the other hand, it might be
unlikely, but not impossible, that Q should be false if P is true. (P: Smith
owns 127 cars. Q: Smith is very wealthy.)
 P entails Q if it is logically impossible that Q should be false if P is true.
 P confirms Q if P increases the likelihood that Q is true.

Given only that P confirms Q, it doesn't follow that acceptance of P
warrants acceptance of Q. Smith is more likely to find a cure for cancer if he
is intelligent than if he is unintelligent, and
P: Smith is intelligent
therefore confirms
Q: Smith will find a cure for cancer.
But acceptance of P obviously doesn't warrant acceptance of Q, since Q is
more likely than not to be false even if P is true.  
By the same token, P does warrant acceptance of
R: Smith has not had more than 10 massive strokes,
given that that, if P is true, there is only a small chance that R is false.
1.2 Deduction in relation to entailment
If P entails Q, then Q can be deduced from P. If a given person knows that P
entails Q and on that basis infers Q 
P: x is a square.
Q: x has more than two sides.
It is impossible for Q to be false if P is true. Therefore, P entails Q.
Given only that P entails Q, it doesn’t follow that, if one infers Q from P,
one is thereby making a legitimate inference.
If Smith knows that P is true and Smith correctly believes that P entails Q,
Smith’s inference does not yield knowledge of Q unless Smith’s reason for
believing that P entails Q is the right one. If Smith believes that squares have
90 sides and for that reason infers Q from P, Smith has not made a legitimate
inference, it being a coincidence that he arrived at the right conclusion.
1.3 Induction in relation to confirmation

P confirms Q if the probability of Q, given P, is higher than the probability of
Q, given not-P. Equivalently, P confirms Q if P, if true, raises the probability
of Q without giving Q a probability of 100%.
It follows that a sufficient condition for P’s confirming Q is that Q be
capable of being legitimately inductively inferred from P:
P: Smith drives a Rolls Royce, wears extremely expensive clothes, has
an excellent credit rating, has an excellent employment history, all of
his jobs being extremely lucrative ones; and, finally, Smith has no
criminal record.
Q: Smith is wealthy.
P, if true, makes it sufficiently improbable that Q is false that we may infer
Q from P. Such an inference is not deductive, given that Smith might be an
extraordinarily talented but penniless con-artist.
Even though Q’s being capable of being legitimately inductively inferred
from P is sufficient for P’s confirming Q, it is not necessary for it.
P: Smith is the most intellectually gifted person in Russia.
Q: Smith will find a cure for cancer.
P raises the probability of Q, whereas not-P lowers the probability of Q.
Thus, P confirms Q, even though by does not by itself warrant acceptance of
Q.
True statements can confirm false ones, but they cannot entail them.
Smith’s fingerprints are on the murder weapon, though true, confirms the
falsehood that Smith is the murderer. But Smith’s fingerprints are on the
murder weapon does not entail Smith is the murderer.
If P entails Q, Q is a logical consequence of P.
Thus, if P is true, no falsehood is a logical consequence of P.
At the same time, if Q is true, it is a logical consequence of some
falsehood P:
P: Smith’s fingerprints are on every weapon in existence entails the truth
that
Q: Smith’s fingerprints are on the murder weapon.
Indeed, given any true proposition Q, there are infinitely many falsehoods

P such that Q is a logical consequence of P.
P1: Either Smith’s fingerprints are on every weapon in existence or 1+2=1.
P2: Either Smith’s fingerprints are on every weapon in existence or 1+2=1.
P3: Either Smith’s fingerprints are on every weapon in existence or 1+3=1.
.
.
.
Pn: Either Smith’s fingerprints are on every weapon in existence or 1+n=1
.
.
.
Q is a logical consequence of Pi, for any i≥1.
1.4 Validity vs. soundness
A valid argument is a deductive argument whose premises, if true, in fact
give a probability of 100% to the conclusion. In other words, a valid
argument is an argument whose premises are supposed to give 100%
probability to the conclusion and whose premises in fact give 100%
probability to the conclusion.
A valid argument can have false premises. For an argument to be valid it is
necessary only that if the premises were true, then there would be a 100%
chance that the conclusion is true. It may be that Smith doesn’t drive a Rolls
Royce or any kind of car for that matter. But it’s still the case that if Smith
did drive a Rolls Royce, then, given that all Rolls Royces are cars, there
would be no chance that Smith didn’t drive a car.
A sound argument is a valid argument with true premises. (For example:
JMK is a human; all humans are mammals; therefore, JMK is a mammal.)
A valid argument cannot possibly have true premises and a false
conclusion, but it can have false premises and a false conclusion or false
premises and a true conclusion.

1.5 Two kinds of induction
There are two kinds of inductive inference: induction by enumeration and
inference to the best explanation.
If, on the basis of the fact that you know of many x’s that are y’s and of no
x’s that aren’t y’s, you infer that all x’s are y’s or that the next x you
encounter is a y, you’ve performed a case of induction by enumeration.
Here is an example. You’ve seen a million swans. They were all white.
(Moreover, you knew in each case that what you were seeing was a white
swan—you didn’t think it was, for example, a beige duck.) You’ve never
seen, or otherwise come to know of, any non-white swan. On this basis, you
infer that all swans are white and, therefore, that, if you ever encounter
another swan, it will be white.
If, in order to account for something of which you have knowledge, you
posit the existence of something of which you don’t have knowledge; you
have made an inference to the best explanation.
All theories are cases of inference to the best explanation. All the theories
put forth by Einstein, Darwin, Freud are instances of this mode of inference.
Inference to the best explanation is a very powerful form of inference. (In
fact, we will see in Section 1.7. that it is the only form of non-deductive
inference. So-called “induction by enumeration,” to the extent that it isn’t a
spurious method of inference, collapses into inference to the best
explanation.)
The conclusions of inferences to the best explanation are always causal
statements. You posit the existence of X, which you don’t know of, in order
to explain Y, which you do know of, because, in your judgment, X, if it
existed, would cause Y to occur.
Example #3 is a case of inference to the best explanation. I infer that Larry
stole my credit cards (etc.) because the relevant data is easy to explain on the
assumption that he did, the reason being that his doing so would have
generated that data, and hard to explain on the assumption that he didn’t, the
reason being that it’s unclear what else could have generated that data.
To take another example: if you infer that a mouse has been eating the
cheese in your cupboard, it’s because a mouse’s doing so would have
generated the relevant data (e.g., the tiny little footprints inside the cupboard),
and it’s not clear what else could have generated that data.
In some cases, the conclusions of inferences to the best explanation aren’t

themselves causal statements. Our knowledge that water consists of H2O
molecules isn’t itself a causal statement. Cause-effect relations hold between
distinct entities (e.g., thunder and lightning). Water and H2O aren’t distinct.
That said, it is believed that water consists of H2O molecules only because
its being so composed would cause various things to happen that do in fact
happen. So even though the conclusion of an inference to the best explanation
need not itself be a causal statement, all inferences to the best explanation are
causal inferences.
1.6 A fact about induction by enumeration
Induction by enumeration isn’t nearly as powerful a form of inference as
inference to the best explanation. Given only that every single one of the
5,000 first editions you’ve ever come across smelled like pipe tobacco, you
cannot reasonably infer that all first editions smell like pipe tobacco. What if
all of those first editions were the property of your pipe-smoking friend
Larry? In that case, you’d have good to reason to suspect that their smelling
like pipe tobacco had to do, not with their being first editions, but with their
being things that had been around Larry.
By the same token, so far as you are entitled to infer that all first editions
smell like pipe tobacco, it’s only to the extent that you have reason to believe
that a thing’s smelling like pipe tobacco is rooted in its being a first edition.
But that means that, if the data entitles you to infer that all first editions smell
like pipe tobacco, it’s only because it also entitles you to accept some
inference to the best explanation (one to the effect that a thing’s being a first
edition is, for some reason or other, responsible for its smelling like pipe
tobacco).
In general, induction by enumeration is parasitic on inference to the best
explanation. In Chapter 12 of Analytic Philosophy, it is shown how a failure
to see this underlies the spurious belief that there is no non-deductive,
inferential knowledge.
1.7 Two kinds of entailment

Just as there are two kinds of inductive inference, so there are two kinds of
deductive inference. In other words, there are two kinds of entailment: formal
entailment and informal entailment.
An entailment is “informal” if the syntactic structures of the sentences
involved are not what make the entailment go through. Consider the
following entailment:
# If Smith is tall and Jones snores, then Smith is tall.
This sentence has the form:
If P and Q, then P.
If a sentence has that form, it constitutes a valid inference. So # is made true
by its form—that is, by its syntax.
But not all valid entailments hold in virtue of syntax. In fact, most do not.
Consider the sentence:
^ If Smith weighs 1000 pounds, and Jones weighs 80 pounds, then
Smith weighs more than Jones.
Obviously ^ is valid. But its syntax isn’t what makes it true, since that
sentence has the same syntax as:
^^ If Smith weighs 80 pounds, and Jones weighs 1000 pounds,
then Smith weighs more than Jones,
which is obviously invalid.
2.0 Some notational conventions relevant to formal logic
Statements of the form “if P, then Q” are known as “conditionals.” The
expression “→” stands for “if...then.” So “P→Q” means “if P, then Q.” Thus,
(1) Smith has four cars→Smith has more than one car
means that
(2) If Smith has four cars, then Smith has more than one car.

Thus, “P→Q” can be taken to mean that P implies Q. Thus “→” expresses
implication.
As we will use the expression “→,” the expression “P→Q” means that P
entails Q, i.e., that it is impossible for P to be true if Q is false. In other
words, “→” expresses what is sometimes referred to as strict entailment. (P
strictly entails Q if, supposing that P is true, there is no way that Q can be
false. In this work, “entailment” and “strict entailment” are synonymous
expressions.)
This isn’t how “→” is typically used. It is typically used to express a much
weaker notion known as material implication. This term is defined below.
Biconditionals and “↔”
Statements of the form “if P then Q, and if Q then P” are known as
“biconditionals.” When stated in non-artificial notation, “if P then Q, and if Q
then P” is typically compressed into “P iff Q” (or “P just in case Q” or “P
exactly if Q”). We’ll compress it into: “P↔Q.” So “Smith is a father↔Smith
is a male parent” says the same thing as “Smith is a father iff Smith is a male
parent.”
Parentheses as indicators of scope
Parentheses are used to indicate how sentences are to be grouped together.
Consider the sentence:
(3) “snow is white and grass is green→grass is green.”
(3) is ambiguous between:
(4) it’s the case that snow is white; and it’s also the case that, if grass is
green, then grass is green
and
(5) supposing that it’s the case that snow is white and that grass is green,

it follows that grass is green.
(4) and (5) have different meanings. (5) doesn’t say that snow is white. Nor
does it say that grass is green. It says that if it’s the case that both grass is
green and snow is white, then it’s also the case that grass is green. (4), on the
other hand, says (among other things) that snow is white. So (4) is false in
universes where snow is green. But (5) is true in such universes. (In fact, (5)
is true in every possible universe.) Since there are circumstances where (4) is
false but (5) is true, they don’t have the same meanings.
Modern symbolic logic gives us a way of avoiding the laborious ad hoc
methods just used to disambiguate (3). To express (4), we say:
(3.4) snow is white and (grass is green→grass is green).
And to express (5), we say:
(3.5) (snow is white and grass is green)→grass is green.
In general, any two co-parenthetical sentences are more tightly bonded to
each other than either is to anything that isn’t co-parenthetical with those
sentences.
Negation
 ~P is the negation of P. Thus,
“~(snow is not white)”
is the negation of
“snow is white.”
This means that
“~(snow is not white)”
is meaning-equivalent with

 “it is not the case that snow is white.”
Be it noted that
“~(snow is not white)”
does not say that snow is black. Nor does it say that snow is green. It says
only that snow isn’t white; everything else is left open.
In general, the negation of a sentence isn’t the same thing as the “opposite”
of that sentence. In modern logic, the word “opposite” has no meaning. The
use of the “~” makes it easy to negate statements that would otherwise be
hard to negate without prejudging important issues or using cumbersome
constructions. Consider the sentence:
(%) If John likes to listen to Mozart, then Larry likes
to listen to Brahms or the sky is blue.
In natural language one way to negate (%) is to put the expression “it is not
the case that’’ in front of it. The result of this operation is:
(%1) “it is not the case that if John likes to listen to
Mozart, then Larry likes to listen to Brahms or the sky
is blue.”
But there’s a problem. (%1) is ambiguous, as it could mean either:
(%2) either the sky is blue or it is not the case Larry likes to listen to
Brahms if John likes to listen to Mozart
or
(%3) it isn’t the case that the sky is blue; nor is it the
case that Larry likes to listen to Brahms if John likes to
listen to Mozart.
It takes work to come up with each of these two sentences. Each of the
original two sentences had to be reparsed; and in each case this reparsing
involved the use of methods that, being ad hoc, could be arrived at only

through a creative insight and logical inference. Such Herculean measures
shouldn’t have been necessary, given that the objective was only to perform a
purely grammatical operation.
This problem doesn’t arise in our special symbolic notation. % can be
unambiguously disambiguated in a mechanical, thought-free manner. One
need only put a ‘~’ before % and then enclose the part one wants negated in
parentheses. Thus, the symbolic analogue of:
(%2S) ~(Larry likes to listen to Brahms if John likes to listen to Mozart) or
the sky is blue;
and the symbolic analogue of (%3) is:
(%3S) ~(either the sky is blue or (Larry likes to listen to Brahms if John
likes to listen to Mozart)).
In (%3S), the scope of the negation-sign is % in its entirety. (Were it not for
the parentheses immediately flanking its second disjunct, (%3S) would be
ambiguous between a conditional whose consequent was a disjunction and a
disjunction one of whose disjuncts was a conditional.) In (%2S), the scope of
the negation-sign is confined to the sentence “if John likes to listen to Mozart,
then Larry likes to listen to Brahms.”
Thus, in our symbolic notation, parentheses are used is to make it clear
how much scope is to be given to a given operator. An “operator” is an
expression that, given one or more sentences, yields a new sentence.
Examples of operators are: “it is not the case that,” “or,” “and,” “because,” “it
is possible that,” and “Fred believes that.”
“Fred believes that” is an operator because, when given the sentence
“snow is white,” it yields a new sentence, namely: “Fred believes that snow is
white.” “And” is an operator because, when given the sentences “snow is
white” and “grass is green,” it yields the sentence “snow is white and grass is
green.” “Because” is an operator for the same reason mutatis mutandis.
(Since “snow is white because grass is green” has a very different meaning
from “grass is green because snow is white,” “because” operates on ordered
pairs of sentences.)
When an operator O occurs in some sentence S, where S has one or more

sentences as proper parts, the scope of that occurrence is identical with the set
of sentences thereby combined into a single sentence.
Consider the sentence:
(i) “Jim is tired because he went jogging and his wife Sally is a very
demanding person.”
This is ambiguous. It could mean either:
(ii) Jim’s wife Sally is a very demanding person; moreover, Jim is tired
because he went jogging
or
(iii) There are two reasons why Jim is tired: first he went jogging; second,
Jim’s wife Sally is a very demanding person.
Thus, in English (or any other natural language), use of the expression
“because” may yield a sentence that is ambiguous and, in addition, can be
disambiguated only by successfully doing a certain amount of syntax-
chopping and, therefore, logic-chopping.
But in our symbolic notation, one can disambiguate (i) without having to
do any logic-chopping. One need only put parentheses around the two
sentences that one wants joined by the “because.” Thus, the symbolic
analogue of (ii) is:
(iiS) (Jim is tired because he went jogging) and Sally is a very demanding
person.
And the symbolic analogue of (iii) is:
(iiiS) Jim is tired because (he went jogging and Sally is a very demanding
person).
Negation in relation to the use of parentheses
Parentheses make it clear what is being negated. For example,

(A) ~snow is white or grass is green
is ambiguous. It could mean either
(B) Either it’s the case that grass is green or it’s the case that snow isn’t
white
or
(C) it isn’t the case that (snow is white or grass is green).
(C) is equivalent with:
(D) snow isn’t white and grass isn’t green.
(B) isn’t equivalent with (D), since (B), unlike (D), is true in a world where
grass is green.
(A1) ~(snow is white or grass is green)
says the same thing as (C), and
(A2) ~(snow is white) or grass is green
says the same thing as (B).
Thus, parentheses make it clear how much scope a given occurrence of
“~” has—that is, they make it clear how much it is negating.
The modal operators—the box and the pound sign
“□P” means “necessarily P” and “#P” means “possibly P.”
Typically, the possibility-operator is a diamond, not a pound sign, but this
publication software doesn’t support use of the diamond.
Note concerning the modal operators: The box and the pound sign are to
be given minimal scope. So “□P→Q” is not to mean that it’s necessarily the
case that P implies Q. Rather, it is to mean that, if it’s necessarily true that P
is the case, then it follows that Q is the case. “□(P→Q),” on the other hand,
does say that it’s necessarily the case that P implies Q.

The non-exclusive meaning of “or”
We’ll use “or” in the non-exclusive sense. So, as we’ll be using it “either
Smith is having dinner or Smith is in London” is consistent with Smith’s
being in London while having dinner. In order for “P or Q” to be true, all that
is necessary is one of those two statements be true. So there are three
circumstances under which “P or Q” is true:
(i) P is true and Q is false.
(ii) Q is true and P is false.
(iii) P is true and Q is true.
In contemporary logic, both formal and informal, “or”
is always used in the non-exclusive sense.
“Unless”
(a) We work unless it is raining
is equivalent with
(b) If we aren’t working, it’s raining.
In general,
(A) P unless Q
means
(B) ~P→Q
The Sheffer Stroke
“/” is  a logical operator known as the “Sheffer Stroke.” The Sheffer Stroke
is defined thus:
P/Q≡DF~P and ~Q

Hence the following theorems:
~P↔P/P
P↔(P/P)/(P/P)
(P and Q) ↔(P/P)/(Q/Q)
(P or Q)↔(P/Q)/(P/Q)
Compatibility and incompatibility
Statements are compatible when neither entails the negation of the other.
Statements are incompatible when the one entails the negation of the other. P
entails Q just in case P is incompatible with ~Q.
2.1 Some general principles relevant to formal logic
Deduction is truth-preserving: A true statement cannot entail a false one. In
other words, a false statement cannot be validly inferred from a true one.
Deduction is transitive (a corollary of the fact that it’s truth-preserving): R
is a transitive relation if, supposing that x bears to R to y and y bears R to z,
then x bears R to z. The relation of being less tall than is transitive. So is the
relation of logical-consequence. Therefore, deduction is transitive. A
statement entails anything entailed by any one of its consequences. For
example:
If Smith is an elephant, then Smith is a mammal.
If Smith is a mammal, then Smith has hair.
Therefore, if Smith is an elephant, then Smith has hair.
Induction isn’t truth-preserving: A true statement may confirm a false one.
For practically any value of “x”, the statement
P: x is a heavy smoker

certainly confirms
Q: x won’t live to be a hundred.
But for some values of x, P is true and Q is false, as there have been heavy
smokers who lived to be a 100.
Commentary: This principle is a simple of corollary of the fact that
multiplying n by a proper fraction yields a number m<n. The same is true of
the next principle.
Induction isn’t transitive: A corollary of the non-truth-preserving character
of induction is that induction is not transitive. In other words, given only that
P confirms Q and that Q confirms R, it doesn’t follow that P confirms R:
P: Smith is a morbidly obese man with a heart condition and terminal
cancer who is due to be executed in five hours.
Q: Smith is a morbidly obese man with a heart condition and terminal
cancer who is going to die soon.
R: Smith will soon die of some ailment related to his obesity, his heart-
condition, or his cancer.
P confirms Q; Q confirms R. But P doesn’t confirm R. P makes it a veritable
certainty that Smith will be executed in five hours and, therefore, that he
won’t die for reasons having to do with his heart or weight or cancer-
situation. So P disconfirms R, even though it confirms Q, which, unlike P,
does confirm R.
Contraposition, conversion, inversion
These are operations that are performed on conditional statements (statements
of the form “if P, then Q”).
The contrapositive of (P→Q) is (~Q→~P).
Thus, the contrapositive of
“If Bob is a dog, then Bob is a mammal”
is

“If Bob is not a mammal, then Bob is not a dog.”
Statements are equivalent with their contrapositives. In other words,
(P→Q)↔(~Q→~P). Bob’s being a dog entails his being a mammal iff his
being a non-mammal entails his being a non-dog.
The converse of (P→Q) is (Q→P). Thus, the converse of
“If Bob is a human, then Bob is a mammal”
is
“If Bob is a mammal, then Bob is human.”
As this example shows, statements are not generally equivalent with their
converses. It’s only when both antecedent and consequent are equivalent that
a given conditional is equivalent with its converse. (In (P→Q), P is the
antecedent and Q is the consequent.) Thus, the converse of
“If Bob is a father then Bob is a male parent is true”
is true, since antecedent and consequence are equivalent.
The inverse of (P→Q) is (not-P→not-Q). Thus, the inverse of
“If Bob is a human, then Bob is a mammal”
is
“if Bob is not a human, then Bob is not a mammal.”
As this example shows, statements are not generally equivalent with their
inverses. It’s only when both antecedent and consequent are equivalent that
conditional is equivalent with its inverse. This is because the converse of a
proposition is equivalent with its inverse. In other words,
(Q→P)↔(not-P→not-Q).
The reason why they’re equivalent is that the second is the contrapositive
of the first. (As we know, contraposing a conditional produces an equivalent
conditional.)

A sentence-level operation is truth-preserving if, when given a true
sentence as input, it cannot possibly yield a false sentence as output.
Contraposition is truth-preserving. Conversion and inversion are not.
Exercise: Prove that, given any conditional sentence S, the contrapositive
of S is equivalent with S. Further, prove that it is not the case that, given any
conditional sentence S, the converse of S is equivalent with S. Finally, prove
that, given any conditional sentence S, the inverse of S is equivalent with the
converse of S.
Material vs. strict vs. formal entailment
Logicians distinguish between “formal” and “material” implication, and
they distinguish each from “strict” implication. “Strict implication” is
synonymous with “entailment”, and “strict entailment” is therefore a
pleonasm. 
P formally entails Q if the sentence ‹if P, then Q› is an instance of an open-
sentence that is true for all values of its free variables. Thus, a formal truth is
a truth that is an instance of an open-sentence that is true for all values of its
free variables. “2 = 2” is a ‘formal’ truth, because it is an instance of the
open-sentence, namely:
“x = x”
which is true for all values of its variables.
Formal implication is a kind of strict implication. Any case of formal
implication is a case of strict implication, but not vice versa. The reasons for
this are given in Analytic Philosophy, Chapters 1, 6, and 18, and also in
Section 4.5 of the present work.
“P materially implies Q” is true if any one of the following three
conditions is met:
(i) P is false and Q is false;
(ii) P is false and Q is true;
(iii) P is true and Q is true.
It is only if
(iv) P is true and Q is false

that P does not materially imply Q.
If P is any false statement P, and Q is any statement at all, “P is true and Q
is false” is false. For this reason, any false statement materially implies all
statements.
Material implication isn’t a form of implication at all. So, while it’s a fact
that, for any statement Q, any given falsity “materially implies” Q, that fact is
an innocuous consequence of a linguistic convention that, although it
concerns the word “implication,” has nothing to do with implication at all.
Material and strict entailment may hold between propositions or between
expressions. But formal entailment holds only among expressions. It is
typically held to hold among sentence-types. My strongly held view is that it
holds only among sentence-tokens. (See Chapter 4 of Analytic Philosophy for
a defense of this claim.) This is the view of Peter Strawson, Jon Barwise, and
John Perry. But for the sake of brevity we will use the term ‘sentence’ to
stand for sentence-type and sentence-tokens.
Modality
“Modal” means “having to do with necessity or possibility.” Possibility and
necessity are properties of statements, not objects. Any statement of the form
□P (‘it’s necessarily the case that P’) or # P (‘it is possible that P’) is a modal
statement.
“Necessary” and “possible” are interdefinable. “Necessary” can be defined
as “not possibly not,” and “possibly” can be defined as “not necessarily not.”
Thus,
□P iff ~#~Q.
Statements that affirm bearing relations, whether deductive or inductive,
are modal. Thus, causal statements are modal statements, since they have the
form □(if P, then Q).
Causal necessity isn’t logical necessity, of course. Given that
(i) I threw gasoline on the fire,
it is causally necessary that

(ii) The fire flared up.
But (ii) isn’t a logical consequence of (i). In other words, it can’t be known
through meaning-analysis or syntax-chopping that (ii) cannot be false if (i) is
true.
2.3 Principles and theorems of formal logic
1. For any x and any y, ((x = y)→(for any property F, (x has F↔y has F))).
(Leibniz’s Law.)
Given anything x and anything y, if x is the very same thing as y, then x has a
given property just in case y has that property.
If x is the very same thing as y, then anything true of the one is true of the
other.
Anything true of one thing is true of another whenever those things are one
and the same.
A necessary condition for identity is sameness of properties.
Commentary: In Chapter 16 of Analytic Philosophy, it is argued that,
although this principle is clearly true for “synchronic” identity-clams, it is
clearly false for “diachronic” identity claims.
2. For any x and any y, (given any property F, ((x has F↔y has F)→(x = y)))
(The identity of indiscernibles.)
Given anything x and anything y, if it the case that x has a given property just
in case y has that property, then it follows that x is the very same thing as x. 
If x has no properties that y lacks and y has no properties that x lacks, then x
is the very same thing as y.  
A sufficient condition for identity is sameness of properties.
Commentary: Though it has been questioned, this principle is clearly correct.

Given any object x, x has the property of being identical with x. So, given
any object y, if y has every property that x has, then y has the property of
being identical with x and is therefore itself identical with x.
But, while it’s true that anything having that property is identical with x,
it’s also trivial. And my suspicion is that those who claim to be asking
whether the identity of indiscernibles is correct are really asking a distinct but
related question, namely: given an object y that has every property had by x,
setting aside those properties that are trivially had by anything identical with
x (e.g., the property of being identical with x), is y identical with x?
That question, unlike the question of whether the identity of indiscernibles
is correct, isn’t trivial. That said, the answer to it does seem, quite clearly, to
be “yes.” If, at any given moment, x is in the same place as y, has the same
mass, is subjected to the same forces, and so on, then surely x is identical
with y.
Additional commentary: The identity of indiscernibles is often said to be the
“converse” of Leibniz’s Law.
This isn’t correct. For P to be the converse of Q, it is necessary that P be a
conditional statement and that Q also be a conditional statement. Leibniz’s
Law isn’t expressed by a conditional statement, and neither is the identity of
indiscernibles.
Each is expressed by a universal generalization. In each case, that
universal generalization is to the effect that each member of an infinitely
large class of conditional statements is correct. But neither is itself expressed
by a conditional statement, and neither is itself a conditional proposition.
Leibniz’s Law is to the effect that:
(LL) for any x and any y, if x is identical with y, it’s impossible for x to lack
any property had by y or vice versa.
LL is not itself a conditional statement. For the same reason mutatis
mutandis, the identity of indiscernibles isn’t given by a conditional statement.
Therefore, neither principle is the converse of the other.
3. P or ~P. (The law of excluded middle.)
Any given statement is either true or false.

What isn’t true or false is not a statement.
S is a statement only if S is either true or false.
S’s being a statement is sufficient for S’s being either true or false.
S’s being either true or false is necessary for S’s being a statement.
Commentary: Whether or not 3 is correct depends on what the word
“statement” is taken to mean. If it’s taken to mean the same thing as
“sentence,” then 3 is false. The sentence (in other words, the sentence-type)
“I am tired” is neither true nor false. (Certain utterances of it are true and
certain utterances of it are false.)
If the word “statement” is taken to mean the same thing as “sentence-
utterance” (or, more generally, “sentence-token”), then, once again, 3 is
false. If, while pointing to an empty space, I say “that elephant is in terrible
pain,” what I’ve said is neither true nor false. There is no such elephant.
Therefore, there is no elephant x such that I am saying that x in terrible pain.
If I am saying anything at all, there is some elephant x such that what I am
saying is true iff x is in terrible pain. Since there is no such elephant, I’m not
saying anything; my utterance is neither true nor false.
If the word “statement” is taken to mean the same thing as “proposition,”
then 3 is correct. What we are seeing is that the so-called truths of symbolic
logic—the “laws of logic”—aren’t true at all. They’re statement-forms, not
statements, and therefore aren’t true or false. And it isn’t easy to find
interpretations of those statement-forms that validate them. In other words, it
isn’t easy to figure out what sorts of constants must replace the variables
occurring in these “laws” if true sentences are to result. This suggests that
modern symbolic logic (a.k.a. mathematical logic, a.k.a. formal logic) isn’t
logic at all. It’s actually a small and rather unimportant branch of a discipline
known as “model theory.” In Section 3.4, we’ll see why, given this fact, it
follows that formal logic has little to do with the way in which any actual or
even possible being reasons.
4. ~(P and ~P). (The law of non-contradiction.)
No statement is both true and false.

The class of statements that are both true and false is empty.
What isn’t true, when non a belief, is either false or a non-statement.
What isn’t false, when not a belief, is either true or a non-statement.
5. (P and (P→Q))→Q. (Modus Ponens.)
Supposing that P, and supposing that P entails Q, it follows that Q.
Any consequence of a truth is a truth.
The consequent of a conditional statement with a true antecedent is a truth.
If the antecedent of a conditional is true, so is the consequent.
The class of truths is closed under the relation of logical consequence.
Example (henceforth “SD”):
Premise: Smith is a dog.
Premise: If Smith is a dog, then Smith is a mammal.
Conclusion: Smith is a mammal.
Commentary: Consider the following argument (henceforth “SD#”):
(1) Smith is a dog.
(2) All dogs are mammals.
Conclusion: (3) Smith is a mammal.
SD# is not an instance of modus ponens. To be an instance of modus ponens,
an argument must have the form:
(1*) P
(2*) If P, then Q
Conclusion: (3*) Q.
Let’s refer to this argument form as “AF*.”
If we replace the occurrence of “P” in AF* with “Smith is a dog” and we
replace the occurrence of “Q” with “Smith is a mammal,” the result is SD,

not SD#. There are no sentences such that, if the sentence-level variables in
AF are replaced with those sentences, the result is SD#. Therefore, SD# is not
an instance of modus ponens.
SD# is a valid argument. But it isn’t an instance of modus ponens. It’s an
instance of the following argument form:
(1#) A has property P.
(2#) For any x, if x has P, then x has Q.
Conclusion: (3#) A has Q.
Let’s refer to this argument form as “AF#.”
SD# makes a statement about SD. SD# says that SD is an instance of
modus ponens. If S is a statement that says of some argument A that A is an
instance of modus ponens, S is not itself an instance of modus ponens. Thus,
SD# is not itself an instance of modus ponens.
6. (P→Q) and ~Q) →~P. (Modus tollens)
A given statement is false if any one of its logical consequences is false.
Premise: If Smith is a dog, then Smith is a mammal.
Premise: Smith isn’t a mammal.
Conclusion: Smith is not a dog.
7. (P and ~Q) →~(P→Q).
Deduction is truth-preserving.
No true statement entails a false one.
Truth implies truth.
Truth follows from truth.
Explanation: If P is actually true and Q is actually false, there is obviously a
possible circumstance where P is true and Q is false. (What is actual must be
possible. The impossible isn’t actual.) An immediate consequence is that P
doesn’t entail Q.

8. ((P→Q) and (Q→R))→(P→R) (If P entails Q and Q entails R, then P
entails R.)
Entailment is transitive.
A statement entails anything that any given one of its consequences entail.
The property of being true is hereditary with respect to the consequence-
relation.
If K is the smallest class containing a given truth P and the logical
consequence any given truth that it contains, then each of K’s members is a
truth.
Commentary: (8) is a corollary of Principle (7).
Also, (8) is equivalent with
(8*) (P→Q)→((Q→R))→(P→R)).
If P entails Q, then P entails R provided that Q entails R.
Each of (8) and (8*) is equivalent with each of the following:
Q is a consequence of P only if every consequence of Q is a consequence of
P.
Q is not a consequence of P unless every consequence of Q is a consequence
of P.
Consequences of consequences are consequences.
9. P→~~P. (The law of double-negation.)
Statements entail the negations of their negations.
A necessary condition for the truth of a given statement is that the negation of
its negation be true.
A statement isn’t true unless the negation of its negation is true.

Premise: Smith is a professor.
Conclusion: It’s not the case that Smith is not a professor.
10. P→(P or Q).
No false disjunction contains a true disjunct.
A necessary condition for the truth a disjunction is that one of the disjuncts
be true.
A sufficient condition for the falsity of a disjunction is that each of its
disjuncts be false.
11. ~(P or Q)↔(~P and ~Q).
A disjunction is false iff all of its disjuncts are false.
A disjunction is false exactly if each of its disjuncts is false.
A disjunction is false unless at least one of its disjuncts is true.
12. ~P→~(P and Q).
No true conjunction contains a false conjunct.
A conjunction is false unless each conjunct is true.
13. ~(P and Q)↔(~P or ~Q).
A conjunction is false just in case at least one of its conjuncts is false.
14. ((P or Q) and ~P)→Q (DeMorgan’s Law)
Given a true disjunction, the one disjuncts follows from the negation of the
other.

Premise: Either Jones is a plant or Smith is in the house.
Premise: Jones isn’t a plant.
Conclusion: Therefore Smith is in the house.
15. ~((~P and Q)→~(P→Q))
A false statement may entail a true one.
The property of being false is not hereditary with respect to the consequence-
relation. 
Explanation: “Paris is in France and Spain is north of Sweden” entails “Paris
in France.” Any given true statement is entailed by each of the infinitely
many false conjunctions of which it is a conjunct. For that reason, and others,
a false statement may entail a true one. (But a true one cannot entail a false
one.)
16. ~((P→Q)→(Q→P))
Propositions aren’t always consequences of their own consequences.
Conversion isn’t truth-preserving.
“Paris is in France and Spain is north of Sweden” entails “Paris in France,”
but not vice versa.
17. P→P
Statements self-entail.
Explanation: P entails P iff it isn’t possible for (P and ~P ) to be true. It isn’t
possible for (P and ~P) to be true. (The law of non-contradiction forbids it.)
Therefore, P entails P.
18. ~Q→((P→Q)→~P)

Nothing but falsity entails falsity.
19. (Q→(P and ~P))→~Q.
Nothing true entails a contradiction.
Explanation: No true statement entails a false one. (Principle 18.) (P and ~P)
is false. (Principle 4.) So for any proposition P, no true statement entails (P
and ~P).
20.(P→~P)→~P
A statement is false if it entails its own negation.
No true statement is incompatible with itself.
Only false statements are incompatible with themselves.
Explanation: Any given statement entails itself. (Principle 17.) So if a
statement P entails its own negation, it follows that P entails (P and ~P). (P
and ~P) is false. (Principle 4.) Therefore, a statement is false if it entails its
own negation.
21. (P and ~P)→Q
Nothing doesn’t follow from a contradiction.
Explanation: There is no possible circumstance where (P and ~P) is true.
Therefore, for any proposition Q, there is no possible circumstance where Q
is false and where (P and ~P) is true.
Some principles of modal logic
1M. P→#P.
Whatever is actual is possible.

2M. □P→P.
Whatever is necessary is actual.
3M. □P→ #P.
Whatever is necessary is possible.
Given that squares must have four sides, they do have four sides.
Commentary: This shows that there is a difference between the possible and
the contingently true. The contingently true doesn’t have to be true; but the
possible is sometimes necessarily, and therefore non-contingently, true.
4M. (P→Q)↔~ #(P and ~Q).
P entails Q iff P can’t be true if Q is false.
Explanation: This is a definition, not a principle. To say that P entails Q is to
say that it’s impossible for P to be true if Q is false.
5M. □(P and Q)↔(□P and □Q).
A conjunction is necessarily true iff each conjunct is necessarily true.
Explanation: If P isn’t necessarily true, there is some possible circumstance
where it’s false and where, therefore, (P and Q) is false, no matter what Q is.
If (P and Q) is necessarily true, there is no circumstance where (P and Q) is
false or, therefore, where either P is false or Q is false.
6M. □~(P or Q)↔(□~P and □~Q).
A disjunction is necessarily false iff each disjunct is necessarily false.
Explanation: Each of P and Q must be false in every possible world in order
for ~(P or Q) to be false in every possible world; and there’s no way that ~(P
or Q) can be true in any possible world if each of P and Q is false in every

possible world.
7M.(□P and #~Q)→~(P→Q).
Nothing that can be false is a consequence of anything that cannot be false.
Explanation: If P is necessarily true (true in all circumstances), whereas Q is
possibly false (false in some circumstances), there are circumstances where P
is true and Q is false (i.e., P doesn’t entail Q).
8M. ~(( # P and #Q)→ # (P and Q)).
Conjoining two possible statements may yield a necessarily false statement.
Explanation: “On June 12, 2009, JMK did not at any time leave the state of
Virginia” is possible, and so is “On June 12, 2009, JMK did at some point
leave the state of Virginia.” But they’re not compossible (i.e., they cannot
both be true).
9M.(# P and □~Q) → ~(P→Q)
Nothing that can be true entails anything that cannot be true.
Explanation: If P is true in some possible circumstance, whereas Q is true in
none, there is a possible circumstance where P is true and Q is false, which
means that P doesn’t entail Q.
10M. □P→(Q→P)
Given any necessarily true statement, there is no statement that doesn’t entail
it.
Explanation: If P is necessarily true, there are no possible circumstances
where P false. A fortiori, there is no possible circumstances where, for any
proposition Q, P is false and Q is true.
11M.~□P→(P→Q)
Given any statement at all, be it true or false, there is no necessarily false

statement that doesn’t entail it.
Explanation: If P is necessarily false, there is no possible circumstance where
P is true. A fortiori, there is no possible circumstance where, for any
proposition Q, P is true and Q is false.
12M. □(P→Q)→(□P→□Q).
A statement is necessary if it’s entailed by a necessary conditional with a
necessary antecedent.
Exercise: 13M can be seen as a
generalization 
of 
Modus 
ponens.
Explain why this is so. Exercise: Is
“(□P→□Q)→□(P→Q)” 
a 
correct
principle? Explain why or why not.
13M. □P→□□P. (“S5.”)
Whatever is necessary is necessarily necessary.
Explanation: Point #1: If ~□□P, then there is some possible circumstance
where ~□P. By contraposition, if there is no possible circumstance where
~□P, then □□P is true. Point #2: If ~□P, then there is some possible
circumstance where ~P. By contraposition, if there is no possible
circumstance where ~P, then □P is true. Point #3: Given Points #1 and #2, t
follows that, if □P, then □□P. Conclusion: S5 is correct.
14M. # P→ ## P.
What is possible is possibly possible.
3.0 Some meta-logical principles: Model theoretic entailment
P model-theoretically entails Q just in case there is no coherently conceivable
scenario where P is true and Q is false.
Thus, 1 + 1 = 2 model-theoretically entails triangles have three sides,
even though the two propositions do not, apart from that, have anything to do

with each other.
This last point is important. There isn’t anything about shapes, let alone
triangles specifically, in 1 + 1 = 2; and there isn’t anything about addition in
triangles have three sides. So even though, technically, each entails the other,
there is no significant sense in which the one can be inferred from the other
—no sense in which a knowledge of the one yields a knowledge of the other.
Of course, somebody who knows that 1 + 1 = 2 will probably also know
that triangles have three sides, but he won’t know the one on the basis of the
other. By contrast, somebody who knows that x is a case of true belief could
potentially know that on the basis of the fact that x is knowledge.
Commentary: Model-theoretic entailment is an over-valued notion that
doesn’t correspond at all well to the conception of entailment embodied in
our inferential practices. Nonetheless, because, in the early ‘60’s, some
branches of philosophy were (wrongly) thought to be successfully assimilated
to a branch of mathematics known as “model theory”—the purpose of this
branch being to study model-theoretic entailment—philosophers now tend to
treat model-theoretic entailment as the fundamental kind of entailment.
Model-theoretic entailment isn’t really a kind of entailment. It is a theory
of entailment. Like other scientists, logicians model data. Where logic is
concerned, the data in question are intuitions on our part to the effect that one
statement is a consequence of another.
(K1) “x is knowledge”
entails
(K2) “x is a true belief.”
Logicians want to make it clear what it is that we know in knowing this; they
want to make it clear what it is for the one statement to entail the second.
Here is the proposal that they came up with:
(MT) for P to entail Q is for there to be no possible circumstance in which
the first is true and the second is false.
Why did logicians choose MT when trying to model our intuitions
concerning entailment? Because MT is extensionally correct. In other words,

for any statements P and Q, P entails Q iff there is no possible circumstance
where P is true and Q is false.
But even though there are no counter-examples to it, MT is false. It is
obviously in virtue of facts about the structures of K1 and K2 that the former
entails the latter. The fact that there are no models in which K1 is true and K2
is false is a mere consequence of that structural fact.
There is a related point. MT defines entailment in terms of “possible.” This
makes it viciously circular. P and Q are compossible (in other words, both P
and Q is possible) iff neither entails the negation of the other. We understand
the concept of possibility only to the extent that we can understand it in terms
of entailment (and other bearing-relations). So unless we’re willing to take
the radically implausible view that “possible” is a primitive expression, MT
defines “entailment” in terms of itself. (A primitive expression is one that
doesn’t consist of other expressions. Examples of such expressions are “red”
or “sweet.”)
To make MT non-circular, we must rid it of the word “possible.” Thus
modified, MT is:
(MT*) for P to “entail” Q is for there to be no circumstance in which the first
is true and the second is false.
In MT*, ‘circumstance’ must be mean actual circumstance. If it means
anything else, MT* will be circular, like MT.
MT* is false. There is no circumstance in which the moon is made of
cheese. And there is no circumstance in which I have ten cars. So there is no
circumstance in which “the moon is made of cheese” is true and in which
“JMK has ten cars” is false. So, according to MT*, the former entails the
latter. But the former doesn’t entail the latter. (The former “materially
implies” the latter. But that’s irrelevant, since material implication isn’t
entailment.)
So model-theoretic entailment isn’t entailment at all. It’s what a wrong
theory of entailment says that it is.
Some of the principles stated in Section 2.3, not all of them, go through
only if “entails” (i.e. “→”) is taken to refer to model-theoretic entailment.

3.1 Formal entailment
In some cases, one statement’s following from another can be determined
entirely on the basis of the structures of those sentences. For any statements P
and Q, ‹P and Q› entails ‹P.› For any statement P, ‹not not P› entails ‹P›. In
other words, “if not-not-P, then P” is true.
If it can be determined that Q follows from P entirely on the basis of the
structural properties of those sentences, P formally entails Q.
For a while, it was thought that all entailments could be formalized—that
is, that whenever one statement entails another, it is entirely because of the
syntactic or structural properties of those sentences. That viewpoint is simply
false. Why it is false is explained in Chapter 1 of Analytic Philosophy,
Section 6.0.
3.2 Formal entailment a relation between expressions
Only expressions have syntax. So, since P formally entails Q only if P and Q
have certain syntactic properties, the relation of formal entailment holds
between sentences (or sentence-tokens), whereas the relations of model-
theoretic entailment holds between propositions, the same being true of
“informal, non-model-theoretic entailment,” which I will now define.
3.3 The one genuinely important kind of entailment: The informal, non-
model-theoretic kind
Let P1 be the statement John knows that 1 + 1 = 2, and let Q1 be the
statement John believes that 1 + 1 = 2.
P1 model-theoretically entails Q1. In other words, there is no coherently
conceivable scenario where P1 is true and Q1 is false.
But the entailment relation that holds between P1 and Q1 is not just an
instance of model-theoretic entailment; it is also an instance of another, more
significant kind of entailment. This is made clear by the fact that there is a
marked difference between, on the one hand, the relation that holds between

P1 and Q1 and, on the other hand, the relation that holds between:
P2: 1 + 1 = 2
and
Q2: triangles have three sides.
The difference is clear. Given the information contained in P1, it can be
deduced that Q1 is true. Q1 is, in some important sense, “implicit in” or
“contained in” P1. But Q2 isn’t implicit in P2. There isn’t anything concerning
triangles in P2—not implicitly or explicitly.
When we make inferences, they are not of the strictly model-theoretic
kind. Rather, they are of the kind where the statement that is inferred is, in
some way or other, contained in the statement from which the inference is
made. So the inference from:
P1: John knows that 1 + 1 = 2
to
Q1: John believes that 1 + 1 = 2
is an instance of the conception of entailment that is embodied in our actual
inferential practices. But that inference isn’t formal; it isn’t like the inference
from snow is white and grass is green to snow is white: the formal properties
of P1 and Q1 leave it open whether Q1 follows from P1. This is because those
sentences are formally identical with, respectively,
P3: John is sure that 1 + 1 = 2
and
Q3: John doubts that 1 + 1 = 2.
P1 is syntactically just like P3, and Q1 is syntactically just like Q3. But there is

no legitimate inference from P3 to Q3; and since those sentences are
syntactically just like P1 and Q1, respectively, it follows there is no legitimate,
purely syntactic inference from P1 to Q1.
Although, as previously discussed, P1 model-theoretically entails Q1, P1
also entails Q1 in some other, much more robust sense. In Kuczynski (2007),
I put forth a theory as to the nature of this other, more important sort of
entailment.
3.5 The ampliative character of deduction
It is often said that, if P entails Q, there is nothing in Q that is not also in P.
So deduction (i.e., the identifying of entailments) is, according to this, “non-
ampliative”—the consequent doesn’t “amplify” the antecedent (i.e., it doesn’t
say anything not said by the antecedent).
This position is obviously false where model-theoretic entailment is
concerned. (Triangles are shapes model-theoretically entails Socrates is
identical with Socrates, but there is nothing in the content of the first that has
anything to do with Socrates.) And it’s obviously false where formal
entailment is concerned. (“Smith is tall” formally entails “either Smith is tall
or grass is green,” but there is nothing about grass in “Smith is tall.”)
3.6 The most important kind of entailment: the non-formal, non-model
theoretic kind
The statement
(P) 1+1=2
model-theoretically entails
(Q) the interior angles of a Euclidean triangle add up to 180°.
And Q model-theoretically entails P.
This is all very well. But it’s patently obvious that you can’t infer the truth

of P from that of Q, or vice versa. In general, model-theoretical entailment is
inferentially useless. A precondition for knowing that P entails Q is that you
know, first, that P cannot be false and, second that Q cannot be false. But if
you know this, there’s no need to infer the one from the other. What this
shows is that knowledge of model-theoretic entailments are parasitic on some
other, much more fundamental sort of entailment. And what this shows is that
knowledge of model-theoretic entailments have no significant role in the
thought-processes of any possible cogitator.
Unlike model theoretic entailment, formal entailment isn’t inferentially
useless. But our ability to make formal inferences is parasitic on our ability to
make informal inferences. Actually, so-called “formal” inferences are
informal ones.
Formal entailment is a relation that holds between expressions (more
specifically, sentences or sentence-tokens). This means that we have to know
what sentences mean to make inferences that are licensed by formal
entailments. To infer
(S1) “snow is white”
from
(S2) “snow is white and grass is green,”
I have to know what those two sentences mean, at least up to a point. I have
to know that “and” doesn’t mean what is in fact meant by “or.” I also have to
know that “snow is white” and “grass is green” are complete sentences—that
they aren’t drivel, like “bunga berka der.”
So in order to infer S1 from S2, I have to know the truth
of some proposition of the form:
(S3) given that S2 means such and such and that S1 means thus and
such, it follows that S1 is true, given that S2 is true.
But S3 is not formally true. First of all, it’s a proposition, not a sentence. But
even the corresponding sentence (the result of putting the verbiage in
question in quotation marks) isn’t formally true. It’s an analytic, logical,
informal truth.

Second reason: Formal truths, and thus formally true entailments, are
instances of universal generalizations that, although analytically true, are not
themselves formal truths. The sentence:
(S4) “if snow is white and grass is green, then snow is white”
is formally true. But why? Because
(S5) for all sentences P and Q, ‹(P and (P→Q))→P›,
though true, isn’t formally true. It instances (e.g., “if snow is white and grass
is green, then snow is white”), but not it itself. This is because it has the same
form as:
(S6) For no sentences P and Q, ‹(P and (P→Q))→P›,
which is false.
Some logicians say that, because S5 has an “all” in the place where S6 has a
“no,” they don’t have the same form. But that’s just a way of saying that they
don’t have the same form because, if they did, then S5 wouldn’t be a formal
truth anymore. It’s a fact that, in any sense of the expression “same form”
that isn’t circularly constructed to validate preexisting theories, S5 and S6
have the same form. They certainly have the same syntactic form, at least as
linguists use the word “syntax.” The rules of sentence construction involved
in the one case precisely parallel those used in the other. It’s a simple fact,
then, that S5 and S6 do not, in any significant sense, differ in form and that S5,
though true, isn’t formally so.
Given that formal truth is parasitic on informal truth, the reason being that
instances of formal truths are instances of informal ones, entailment cannot
ultimately, or even proximately, be understood in formal terms and, in
addition, only a fraction of the inferences that we make are formal. (This is
setting aside the fact noted a moment ago that so-called formal reasoning is
really informal reasoning in disguise.)
3.7 Entailment not a limiting case of confirmation

For P to entail Q is not for P to confirm Q to the highest possible
degree.
Entailment is a logical notion. Confirmation is an explanatory notion.
For P to confirm Q to be a high degree is for (P and not-Q) to be
counter-explanatory. In other words, it is for (P and not-Q) to be false unless
deeply rooted presumptions about how the world works are uprooted and
replaced.
For P to entail Q is for (P and not-Q) to be counter-conceptual. In other
words, it is for the structures of concepts, unassisted by presumptions on our
part as to how the world works, to prohibit the falsity of Q, given the truth of
P.
Therefore, P’s confirming Q to the highest possible degree is different
from P’s entailing Q.
3.8 Entailment both an intersentential and an interpropositional relation
Sometimes the word “entailment” refers to a relationship that holds between
propositions (sentence-meanings), and sometimes it refers to a relation that
holds between expressions of some kind. Some logicians hold that those
expressions are sentence-types. Others, myself included, hold that those
relations may hold between sentence-types and also between sentence-
tokens. (Peter Strawson (1950) was the first to distinguish token-entailment
from type-entailment. In so doing, he performed a major service for
philosophy.)
With rare exceptions (Strawson being one of them), authors who discuss
“entailment” don’t make it clear whether they are talking about a relationship
that holds between propositions, sentences, or neither.
Because this is an introductory text, we are leaving it open whether
entailment refers to
(i) an intersentential relation,
(ii) an interpropositional relation,
(iii) both,
(iv) some third notion, or
(v) all of the above

The answer is (v). We will now outline the reasons for this. (These reasons
are discussed in detail in Intermediate Set-theory and Logic.)
3.8.1 Four kinds of logical equivalence
There are four kinds of logical equivalence:
(i) The kind that holds between propositions,
(ii) The kind that holds between sentence-tokens, and
(iii) The kind that holds between sentence-types.
(iv) The kind that holds between predicates.
The following two propositions are equivalent:
(1) Jim has 2 cars.
(1*) If n is the number of Jim’s cars, n+1=3.
(1) cannot be true unless (1*) is true, and (1*) cannot be true unless (1) is
true. In general, two propositions P and Q are equivalent iff the one cannot be
true unless the other is true.
To say of two sentence-tokens, S and S*, that they are ‘equivalent’ is to
say that, if P and P* are the propositions meant by S and S*, respectively, P is
equivalent with P*. Thus, if S is an utterance of “Jim has 2 cars” and S* is an
utterance, in the very same context, of “if n is the number of Jim’s cars,
n+1=3”, then, given that the propositions borne by S and S*are (1) and (1*),
respectively, it follows that what is meant by S is equivalent with what is
meant by S*, in the sense that what is meant by S is true just in case what is
meant by S* is true.
      Sentence-types are neither true nor false. The sentence-type “I am tired”
is neither true nor false. It is particular tokens of that type that are true or
false. The meaning of that type is a rule to the effect that if somebody x utters
that sentence in a given context C, then that utterance is true exactly if, in C,
x is tired. Thus, the meaning of the sentence-type “I am tired” is a function
from contexts of utterance to propositions. The same is true of any given
sentence-type of natural language. Any given such sentence contains a tense-
marker and therefore has for its meaning a function from times of utterance to
propositions. In some cases, e.g. “2+2 equals 4”, the function in question is a

constant function: any two tokens of that sentence-type encode the same
proposition. But a function, even a constant function, from contexts of
utterance to propositions is neither true nor false. Therefore, supposing
arguendo that two sentence-types, T and T*, can be ‘equivalent’, it is not in
the same sense as S and S*. Nor, obviously, is it in the same sense as T and
T*.
That said, there is a sense in which two sentence-types can be equivalent.
Let T be the sentence-type “for any n, if triangles have n-many sides, then
n2=9”, and let T* be the sentence-type “for any n, no triangle has n-many
sides unless n+1=4.” There is a sense in which T and T* are ‘equivalent.’
They are equivalent in the sense that, the semantic rules of English semantic
being what they are, no token of T can bear a proposition that is non-
equivalent with any token of T*. So, if p1…pn are the semantic rules of
English, then to say of T and T* that they are equivalent is to say: A
consequence of p1…pn is that no proposition thereby assigned T is non-
equivalent with any proposition thereby assigned to T*.
The fourth kind of equivalence is predicate-equivalence. Consider the
following two predicates:
(a) “x is tall,”
(b) “Either x is tall or x is a square circle.”
Since “x” is a variable, neither (a) nor (b) is either true or false. But (a) and
(b) are equivalent, in the sense that the one is true for the same values of “x”
as the other. 
Technically, a distinction is to be made between predicate-type
equivalence and predicate-token equivalence. And a distinction is to be made
between each of those two kinds of equivalence and propositional-schema
equivalence, a propositional-schema being what is meant by a predicate (or,
strictly speaking, predicate-token).
3.9 The irrelevance of formal logic to thought
For reasons that were discussed in Chapters 1, 7, and 18 of Analytic
Philosophy, any assistance that knowledge of formal logic can provide one in

the way of acquiring knowledge is parasitic on one’s knowledge of informal
analytic truths. This has nothing to do with the idiosyncrasies of human
psychology. It’s an epistemological consequence of a strictly logical point.
Given any open-sentence (or open-proposition) all of whose instances are
true, for example:
(1) ‹(P and (P→Q))→Q›,
the fact that it’s true for all its instances is a consequence of the fact that some
informal truth holds—for example:
(2) given any two propositions P and Q, ‹(P and (P→Q))→Q›).
It must be stressed that (2) is an informal truth. (2) has the same form as
the false statement that:
(2#) given no two propositions P and Q, ‹(P and (P→Q))→Q›).
Nothing that has the same form as a false statement is formally true.
Therefore, (2), though true, isn’t formally so. (2#) is a statement about a class
of formal truths; but, like most statements about formal truths, it is not itself a
formal truth.
Bearing this in mind, consider the following statement, which, unlike (2),
is formally true:
(3) “if snow is white, and (if snow is white then snow is not pink), then
snow is not pink).”
There are two different reasons why one might accept (3). One is that one
knows it to be an instance of (1) and one accepts it for that reason. But in that
case, one is accepting (3) on the grounds that it’s a consequence of (2). Since
(2) is informal, one’s acceptance of (3), under those circumstances embodies
knowledge of an informal truth.
The same thing holds if one’s acceptance of (3) is based on one’s
understanding of the concepts meant by the expressions composing it.
Suppose that your reason for accepting (3) is that, given your understanding
of the concept expressed by “if...then...,” you know that it would be absurd to
deny (3). In that case, your acceptance of (3) is based on your knowledge
that, the structure of that concept being what it is, any proposition of that

form must be true. Thus, your acceptance of (3) is based on your acceptance
of (2). Given that (2) is an informal truth, your acceptance of (3) under those
circumstances constitutes informal knowledge. There is no circumstance,
therefore, under which your knowledge of (3) is any sense formal. The
concept of “formal” (or “mechanical”) thought is therefore an incoherent one.
4.0 Models
An open-sentence is an expression that contains a free variable, and is
therefore neither true nor false, but is otherwise just like a sentence. So ‹x is
an even number› is an open-sentence, since it contains a variable (“x”) where
there should be a “2” or a “4” or some such. It often happens that, given a set
of one or more open-sentences, we wish to find some way of replacing the
variables with constants that yield true sentences. For example, let S1 be the
set containing the following two open-sentences (I’ll henceforth omit the use
of quasi-quotation marks):
(1)  x is an even number that is greater than zero.
(2)  x is less than 20.
If we assign the number two or the number four to x, the result is that both
sentences are true. So each of these assignments validates S1.
In general, given a set of open-sentences, an assignment of constants to the
free variables validates that set iff two conditions are met. First, that
assignment turns each open-sentence in that set into an actual sentence.
Second, every sentence is true.
An assignment of constants to a set of open-sentences is an interpretation
of that set. An interpretation of such a set validates it iff, under that
interpretation, every sentence in that set comes out true.
Let S2 be the set containing only the following open
sentences:
(1) x is an odd number.
(2) x2 is greater than 80.
(3) root-x is irrational.

If we assign the number nine to x, (1) and (2) come out true; but (3) does
not. But if we assign the number 13 to x, (1)–(3) all come out true. (It is
assumed that the universe of discourse is the set of numbers. This assumption
will continue to be made until further notice.)
An assignment of constants to such a set of open-sentences is an
interpretation of that set. Not all such sets are validated by all interpretations
of them, as we just saw.
False interpretations must be distinguished from partial interpretations. A
partial interpretation is one that is incomplete but is correct as far as it goes.
Let S3 be the set containing only the following open-sentences:
(1) x is a phi.
(2) x is larger than y.
(3) y is a phi.
(4) y is a psi.
If we assign the numbers 10 and 8 is to x and y respectively, and the property
of being even to “phi,” we’ve partially interpreted S3, since, under that
interpretation, (1)–(3) come out true. But since we haven’t yet assigned a
meaning to “psi,” we haven’t completely interpreted it. We have completely
interpreted that set of open sentences if we make the further stipulation that
for a thing to be a psi is for it to have the property of being less than 9. In
fact, supposing that we make that additional stipulation, we have provided a
complete interpretation of them that validates them. If we had instead
stipulated that for a thing to be a psi is for it to be less than 5, we would have
provided a complete interpretation of those open sentences that failed to
validate them.
Oftentimes, the interpretations that are of interest are very abstract ones.
Let S4 be the set containing just the following open-sentences:
(1) x is a phi.
(2) x bears R to y.
(3) y is a psi.
(3) R is “reflexive” (any given thing bears R to itself).
(4) y bears R to z.
(5) z is a phi.
(6) R is “transitive” (if a bears it to b, and b bears it to c, then a bears it to

c).
Here’s an interpretation of S4. x, y, and z are, respectively, the numbers two,
three, and four. Phi and psi, respectively, are the properties of being even and
odd. R is the less relation of being less than or equal to. y is the number.
Question: Does the following set (S5) have an
interpretation that validates it? If so, what is it?
(1) x is a phi.
(2) x bears R to y.
(3) Anything that bears R to anything bears R to itself.
(4) y bears R to z.
(5) Nothing bears R to anything that has phi.
Some sets of open-sentences are true under all interpretations of them. An
example is the set containing: “x is identical with x” and “if, for some phi, x
has phi and y does not have phi, then x is not identical with y.” Others (e.g.,
any set containing “x is not identical with x”) are true under none.
Any interpretation of a set of the first kind is a formal truth. Thus “JMK is
identical with JMK, and anything identical with a professor is identical to
nothing that isn’t a professor” is a formal truth.
5.0 Proof that all knowledge is inferential
The objects of knowledge are truths (e.g. 2+2=4), not things (stable-
patterns of mass-energy displacements, e.g. rocks, trees, stars). One is aware
of things; one does not in the relevant sense know them. (In Spanish, German,
and French, there is one word for truth-knowledge (saber, wissen, savoir) and
a different one for thing-knowledge (conocer, kennen, connaître). It is truths,
and truths alone, that one knows.
We obviously acquire a great deal of knowledge on the basis of sensory
observation. But because it is states of affairs (these being compendia of
things: rocks, trees, and the like), not truths, that are the objects of sensory
observation, the contents of our observations must be converted into
propositions if those observations are to avail us of knowledge, as opposed to
mere awareness.

The conversion of non-propositional (observational, objectual) content into
propositional content involves knowledge of relations R1…Rn between non-
propositional data-sets, on the one hand, and propositions, on the other,
whereby, given such and such data-sets, R1…Rn warrant the acceptance of
thus and such propositions. R1…Rn cannot possibly be given by empirical
propositions (propositions known on the basis of sense-perception), since it is
only if we first know R1…Rn that observation can avail us of any knowledge.
Therefore,
(i) R1…Rn are analytic truths, and
(ii) Our knowledge of R1…Rn is a priori, meaning that
said knowledge is constitutive of our ability to acquire
knowledge.
Thus, Kant’s contention that we have a priori knowledge is correct, and
Leibniz’s contention that there are analytic truths is also correct.  
5.1 Proof that some truths are non-empirical
A truth is non-empirical if it cannot be known on the basis of sensory
observation. A proposition is “analytic” if its own structure guarantees its
truth. All non-empirical truths are analytic and vice versa.
Proof that not all truths are empirical and that not all knowledge is strictly
observation-based: The proposition that
(1) All truth is empirical truth
is true exactly if
(2) The class K of non-empirical truths is empty.
(2) cannot be known to be true on empirical grounds, since it concerns the
scope of what cannot be known on such grounds. So (1) is not true unless it is
a non-empirical truth. And if (1) it is non-empirical truth, then (1) is false.
Therefore, it is false.
It follows that there are analytic truths (e.g. the negation of 1), and also

that we have knowledge of analytic truths (e.g. our knowledge of the
negation of 1).
6.0 Set-theoretic characterizations of truth, meaning, and entailment
Truths are true propositions. A proposition is a class of properties. More
precisely, a given proposition P is the smallest class of properties p1…pn such
that
(i) P is true exactly if p1…pn are jointly instantiated and
(ii) It must be assumed that p1…pn are P’s constituents, lest P’s inferential
properties be inexplicable.
Let P be the proposition Sam is smart. P is true exactly if the following
properties are instantiated:
p1: The property of being identical with Sam.
p2: The property of being smart.
p3: The property of being a thing x such that x=Sam and x is smart.
Of course, P is true exactly p3 by itself is instantiated. (This is consistent
with our analysis, since, if p3 instantiated, so are p1 and p2. ) But p1 and p2
must be reckoned as being among the constituents of P. This is because P’s
composition must parallel that of the sentence “Sam is tall.” For P is by
definition the meaning of (that which is expressed by) the sentence “Sam is
tall” (henceforth “S”); and S’s constituents (setting aside the tense-marker,
which is not important in this context) are
(1) “Sam”
(2) “is tall” (or, more accurately, “x is tall”---the “x”,
though typically orthographically suppressed, always
being semantically present), and
(3) “Sam is tall.”

If it is assumed that P’s composition parallels S’s, then P must be assumed
to be a set whose members p1,  p2, and p3. And unless P’s composition is
assumed to parallel S’s, it is impossible to explain P’s inferential properties.
For example, when it is said, as it sometimes is, that the proposition (not the
sentence)
(P2) something is smart
is a formal consequence of P, this can be taken to mean that:
(P3) Being a member of P, p2 cannot be instantiated unless P is true.
In general, cases of formal entailment among propositions can be
identified with cases of set-membership. (Formal entailment among sentences
is an entirely different matter.) Given two propositions p and q, p formally
entails q if q is a member or the property-class with which p is identical.
p informally entails q if
(a) q is not a member of p, but
(b) There is some property class Q such that q is a
member of Q and, moreover, the members of Q are
jointly instantiated just in case the members of p are
jointly instantiated.
For example,
(P4) Sam is both sentient (aware, but not necessarily
truth-aware) and sapient (truth-aware, as opposed to
object-aware)
is an informal consequence of P. x is sentient is not a constituent of P. But x
is sentient is a constituent of many a proposition Q that is equivalent with P,
e.g.
(P5) Sam is sentient, sapient, and, relative to other
sapient creatures, exceptionally adept at processing
information.

Not only is P5 a consequence of P; P is a consequence of P5. They are
equivalent, since each is an informal consequence of the other.
In general, if P then Q is necessarily true if the members of P cannot be
jointly instantiated unless the members of Q are jointly instantiated, and it is
formally true if the members of Q are subset of the members of P.
The sequel to the present volume contains an analysis of molecular
propositions (propositions that are either quantified generalizations or that
contain other propositions as proper parts), which, though a natural extension
of the just-stated analysis, is not an obvious such extension. The sequel also
contains rigorous and general analyses of function, recursion, number, formal
language, continuity, and dimensionality. We will now put forth rough and
ready analyses of these concepts, it being the purpose of the sequel to this
text to justify as well as refine these analyses.
7.0 Outline of the contents of the sequel to this volume
7.1 Function
A function is a rule that assigns no more than one output to any given
input. A function therefore generates, and may therefore be identified with, a
class K of ordered pairs such that if (x,y) and (x,z) both belong to K, then
y=z.
A function of more than one variable can be represented as a function
one variable, where that variable is an ordered n-tuple. Thus, the addition
function can be regarded as a function of two variables (e.g. one that assigns
7 to 3 when the value of the other independent variable is 4) or as a function
of one variable (one that assigns 7 to (3,4)).
7.2 Recursive definition
A recursive definition is one to the effect that some class K is the
posterity of α with respect to R, for some α and some ordering relation R.
R is an ordering relation if R with respect to K if, for any members x, y,
and z of K, ¬xRx (x doesn’t bear R to itself: R is non-reflexive), asymmetric

(xRy→¬yRx) (y doesn’t bear R to x if x bears R to x: R is asymmetric) and 
(xRy→(yRz→xRz) (x bears to whenever y bears R to z and x bears R to y: R
is transitive).
K is the posterity of α with respect to R if K is the smallest class such
that
(i) α ∈K, and
(ii) δ ∈K whenever βRδ,
where β ∈K.
7.3 Cardinals, rationals, and reals
A cardinal number is the size of a class. The meaning of
(a) Jim has 3 houses
is
(b) K has 3 members,
where K is the class of Jim’s houses.
The class ℕof cardinal numbers is defined inductively: x belongs to ℕ
iff either
(A) x=0 or
(B) x=n+1,
where n ∈ℕ.
Given a class K, K has 0 members if, for all x, x ∉K; and K has n+1
members if, for some y such that y ∈K, any class K* has n members if
y ∉K* but K* otherwise has the same members as K.
ℚcan be recursively defined, where ℚis the class of rationals, since the
members of ℚ are the members of the posterity of k2 with respect to ρ, where
kn is the class of all rationals (with denominator n>0) having index n,
meaning that kn={p/q: p+q=n} (e.g. k5={1/4,4/1,2/3,3/2}, and where ρ is the

relation borne by km to km+1, for arbitrary m.
Equivalently, ℚ is the smallest class whose members occurring on the
following series:
1/1, ½, 2/1, 1/3, 3/1, 2/2, ¼, 4/1, 2/3, 3/2,…
The reals cannot be recursively defined since, given any list L of real
numbers (represented as repeating decimals), D(L) ∉L, where D(L) is the
number that results when, if x is the figure n the nth decimal place of the nth
member of L, x is replaced with x+1 when x<9 and x is replaced with 0 when
x=9.  
ℝ is the class that contains every rational, along with every number that
is the limit of an initial segment of ( ℚ,<), where ( ℚ,<) is the series rationals
arranged from lesser to greater. An initial segment of ( ℚ,<) is one that
doesn’t contain a given rational unless it contains every smaller rational.
7.4 Formal languages
A formal language is a recursively defined expression-class.
If K is a class of truths, K can be formalized if there is some formal
language L such that, for some t, t ∈K whenever s ∈L, where t is the
meaning of s. 
Therefore, a class K of truths can be formalized exactly if K can be
recursively defined.
7.5 Incompleteness
 Any given recursive definition generates a discrete series (a series each
of whose members has an immediate successor). If S and S* are any two
discrete series, S and S* are isomorphic, meaning that any truth concerning
the relation of any S-member x to any S-member y is equivalent to some
truth about some S*-member x* to some S*-member y*.
Any given discrete series is isomorphic with ( ℕ,<), this being the
series: 0,1,2,3,…
Therefore, any given recursive definition, and therefore any
uninterpreted calculus (any formal language), is modeled by a structure that is

structure-identical with ℕ.
This means that ( ℕ,<) is a model of any formal language L of which
( ℝ,<) is also a model.
This means that there is no way to formalize arithmetic, since ( ℝ,<) is
described by a subset of the class of arithmetical truths.
This means that any consistent model of arithmetic is incomplete.
7.6 Axiom-sets in relation to incompleteness
An axiom-set is a finite class of sentence-schema. A sentence-schema
(plural: schemata) is an expression that contains a free variable, and is
therefore neither true nor false, but is otherwise just like a sentence. x is tall is
a sentence-schema. Other examples of sentence-schemata are: x has ��, x
bears R to y, and P or not-P.
An axiom is a member of an axiom-set.
An axiom is neither true nor false, since an axiom is a sentence-schema
and sentence-schemata are neither true nor false.
Given a class K of sentence-schemata, K* is a model of K if, for any
member s* of K*, there is some member s of K such that s* is the result of
coupling s with a specific meaning.  
A class K* of truths can be formalized if, and only if, K* is the model
of a class K sentence-schemata all of whose models are isomorphic with each
other. If, for any class K of sentence-schemata modelled by a class K* of
truths, there are non-isomorphic models, then K* cannot be formalized. If, for
some such class K, any models of K are isomorphic, then K* can be
formalized.
If K ℝmodels a recursively defined class K of sentence-schemata, where
K ℝcontains the arithmetic of real numbers, K ℕalso models K, where
K ℕcontains the arithmetic of cardinals but not of reals. There is no one-one
correspondence between K ℝ, and K ℕ. Therefore, K ℕ is not isomorphic with
K ℝ. Therefore, K ℝ cannot be formalized.
7.7 Compactness vs. continuity

A series S is compact if it is not discrete. ( ℚ,<) is compact. S is
continuous if it contains each of its own limiting points. ( ℝ,<) is continuous.
( ℚ,<) is not continuous.
Continuous series are always compact, but compact series are not
always continuous.
7.8 Set-measure
The measure of a class K is minimal if K has n-many members, for
some n≤ℵ0, where ℵ0-many is the number of members of any class that can
be recursively defined.
The measure of a class is nil if K has no members. 
The measure of a non-empty class is non-minimal if K has ℵ1-many
members, where ℵ1 is the number of members of ℝ.
The values of direct measurements are always given by rational
numbers. But given two direct measurements whose values are m1 and m2, it
may follow that m3 is irrational. For example, the length of  m3 = √2 units
when m3 the length of the hypotenuse of a right triangle  each of whose other
sides have been shown through direct measurement to have a length of one
unit.  
If M1 and M2 are the numbers corresponding any two distinct lengths
(or velocities or masses or volumes…), there are infinitely many irrational
numbers M3 in between M1 and M2. Therefore, if φ is any degree property
(e.g. length, mass, volume), the degree to which x has φ cannot change at all
without assuming infinitely many irrational values. It follows that the number
of any class K that does not contain irrationals is too small to be the measure
of any magnitude that is had to any degree other than an infinitesimally small
one, this being why a class whose cardinality is n, where 0≤n≤ℵ0, is
minimal (but not nil).
Equivalently, measurement is neither identical nor identifiable with
enumeration. To enumerate a class is to assign each of its members an
integer, on the condition no two members are assigned the same integer.
Since [ ℚ]=[ ℕ], where [k] is k’s cardinality, ℚis as measurement-useless

as ℕ. And since [ ℝ] is by definition the number of the smallest non-
measurement-useless class, it follows that the values of direct and indirect
measurement are always real numbers.
7.9 Nil vs. infinitesimal
Real numbers are degrees. Cardinals are class-sizes. Rationals are
relations between class sizes. (m/n is the relation that x bears to y when
x×n=y×m.)
Given an event e, when it is said that p(e)=0, where p(e) is the
probability of e, this is ambiguous, as it could mean either
(A) e’s probability is nil or
(B) e’s probability is minimal but not nil.
Given some quarter C and some surface S larger than C on which C is
being dropped, there are ℵ1-many regions on S that C can occupy. Therefore,
the probability that C will occupy this or that specific region is less than any
positive amount, since 1/ ℵ1 is less than any positive rational. But there is
some region R such that C does occupy.
p(e) is minimal but not nil, where e is C’s occupying R, for some
specific region R. Equivalently, 0C≠OR, where 0C  is cardinal 0 and 0R is real
0.
A magnitude is 0R if that magnitude’s degree is 0. If D is a given
magnitude’s degree, D is 0 if D≤ℵ0. Probabilities are given by degrees, like
mass and length. If probabilities were given by enumerable quantities, it
would indeed be a paradox that there should occur events of probability 0.  
7.10 Dimensionality
S is a 1-dimensional series if S is a continuous series whose members
are non-series. S is an n+1-dimensional series if S is a series whose members
are n-dimensional series. 
Fin

`,
  title: "Introduction to Symbolic Logic",
  author: "J.-M. Kuczynski",
  year: "2024"
};

export function getFullDocumentContent(): string {
  return symbolicLogicContent.fullText;
}

export function getDocumentTitle(): string {
  return symbolicLogicContent.title;
}

export function getDocumentAuthor(): string {
  return symbolicLogicContent.author;
}

export function getDocumentYear(): string {
  return symbolicLogicContent.year;
}
