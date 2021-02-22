import './preview.css';
import { useRef, useEffect } from 'react';

interface PreviewProps {
  code: string;
  err: string;
}


const html = `
<html>
  <head>
    <style>html { background-color: white; }</style>
  </head>
  <body>
    <div id="root"></div>
    <script>
      const handleError = (err , errorType) => {
        const root = document.querySelector('#root');
        root.innerHTML = '<div style="color: red;"><h4>' + errorType + '</h4>' + err + '</div>';
        console.error(err);
      };

      window.addEventListener('error', (event) => {
        event.preventDefault();
        handleError(event.error , "Runtime Error");
      });

      window.addEventListener('message', (event) => {
        if(!event.data.err) {    
            eval(event.data.code);
        } else {
          handleError(event.data.err , "Transpiler Error");
        }
      }, false);
    </script>
  </body>
</html>

  `;

const Preview: React.FC<PreviewProps> = ({ code, err }) => {
  const iframe = useRef<any>();

  useEffect(() => {
    iframe.current.srcdoc = html;
    setTimeout(() => {
      iframe.current.contentWindow.postMessage({code , err}, '*');
    }, 50);
  }, [code, err]);

  return (
    <div className="preview-wrapper">
      <iframe
        title="preview"
        ref={iframe}
        sandbox="allow-scripts"
        srcDoc={html}
      />
    </div>
  );
};

export default Preview;
