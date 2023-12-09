import Answer from './answer';

function QA() {
  return (
    <div class="flex flex-col">
      <header class="main-header">
        <h2 class="text-3xl font-medium">header</h2>
      </header>
      <section class="max-w-[1024px] self-center">
          <div class="flex flex-col border-t border-b">
            <div class="text-xl mb-2">
              Q 경북소프트웨어고등학교 가기 어렵나요?
            </div>
            <div class="mb-5">
              경북소프트웨어고등학교 가고싶은 충남에 사는 중2인데  성적이 어느정도여야 경북소프트웨어고등학교에 갈수있을까요
            </div>
            <div class="mb-6">
              <a href="/" class="text-blue-800">고등학교진학</a>
            </div>
            <div class="flex justify-between">
              <div class="flex gap-2">
                <div class="question-profile">
                  profile-icon
                </div>
                <div class="question-name">
                  kbs2****
                </div>
                <div class="question-date">
                  · 2006.01.07
                </div>
                <div class="question-views">
                  · 조회수 1,216
                </div>
              </div>

              <div class="flex gap-2">
                <div class="reply_icon">
                  reply_icon
                </div>
                <div class="question_report">
                  report_icon
                </div>
              </div>
            </div>
          </div>
          <div class="answer-title">
              <div class="mb-3">
                A n개
             </div>
          </div>
          <Answer nickname="김대용" content="ㅁㄴㅇㄻㄴㅇㄻㄴㅇㄹ"/>
          <Answer nickname="강정우" content="asdfaasdfasdf"/>
          <Answer/>
          <Answer/>
      </section>
      <footer class="main-footer">
        
      </footer>
    </div>
  );
}

export default QA;
