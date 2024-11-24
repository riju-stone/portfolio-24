export class Splitext {
  text: string;
  textArr: string[];

  constructor(text: string) {
    this.text = text;
    this.textArr = text.split("");
  }

  getLines(lineLength: number): string[] {
    const lineArr: string[] = [];
    let line = "",
      word = "";
    for (let i = 0; i < this.textArr.length; i++) {
      if (this.textArr[i] != " ") {
        word += this.textArr[i];
      } else {
        if (line.length + word.length < lineLength) {
          line += word + " ";
        } else {
          lineArr.push(line);
          line = word + " ";
        }
        word = "";
      }
    }

    return lineArr;
  }

  getWords(): string[] {
    return this.text.split(" ");
  }

  getChars(): string[] {
    return this.textArr;
  }
}
