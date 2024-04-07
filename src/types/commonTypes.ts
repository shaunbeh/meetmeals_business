export type ServerSideProps = {
  content?: string;
  faqs?: { ['key']: { question: string; answer: string } };
  layoutProps: {
    headerContent?: string;
    footerContent?: string;
  };
};
