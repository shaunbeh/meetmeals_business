export default function Faqs({
  data,
}: {
  data: { ['key']: { question: string; answer: string } };
}) {
  return (
    <div id='faqs' className='my-single mb-48'>
      <div className='mx-auto'>
        <div className='top'>
          <div className='flex items-center inner-title'>
            <i className='icon-question'></i>
            <h2 className='title-heading'>سوالات متداول</h2>
          </div>
          <span className='subtitle'></span>
        </div>
        <div className='faqs-content'>
          {Object.values(data).map((faq, idx) => (
            <div key={idx} className='faqs-item'>
              <div className='flex'>
                <div className='w-full mx-auto'>
                  <div className='faqs-question accordion'>
                    <b className='faq-num'>{idx + 1}</b>
                    <h3 className='grow'>{faq.question}</h3>
                    <div className='icon'>
                      <i className='icon-mines'></i>
                      <i className='icon-mines'></i>
                    </div>
                  </div>
                  <div className='faqs-answer accordion-content'>
                    <div className='editor-content main-content'>
                      <p>{faq.answer}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
