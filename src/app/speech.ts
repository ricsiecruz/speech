export interface Speech {
    id: any;
    title: string;
    speech: string;
    author: string;
    date: Date;
    keywords: Keywords[];
  }
  
  export interface Keywords {
    text: string;
  }
  