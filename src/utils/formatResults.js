const pb = {
  le: '<:le:1168521395030982780>',
  me: '<:me:1168521400638767224>',
  re: '<:re:1168521407349669939>',
  lf: '<:lf:1168521398906519562>',
  mf: '<:mf:1168521404195553371>',
  rf: '<:rf:1168521409509724220>',
};

function formatResults(upvotes = [], downvotes = []) {
  const totalVotes = upvotes.length + downvotes.length;
  const progressBarLength = 14;
  const filledSquares = Math.round((upvotes.length / totalVotes) * progressBarLength) || 0;
  const emptySquares = progressBarLength - filledSquares || 0;

  if (!filledSquares && !emptySquares) {
    emptySquares = progressBarLength;
  }

  const upPercentage = (upvotes.length / totalVotes) * 100 || 0;
  const downPercentage = (downvotes.length / totalVotes) * 100 || 0;

  const progressBar =
    (filledSquares ? pb.lf : pb.le) +
    (pb.mf.repeat(filledSquares) + pb.me.repeat(emptySquares)) +
    (filledSquares === progressBarLength ? pb.rf : pb.re);

  const results = [];
  results.push(
    `👍 ${upvotes.length} upvotes (${upPercentage.toFixed(1)}%) • 👎 ${downvotes.length
    } downvotes (${downPercentage.toFixed(1)}%)`
  );
  results.push(progressBar);

  return results.join('\n');
}

module.exports = formatResults;