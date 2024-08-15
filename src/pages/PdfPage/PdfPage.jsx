import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { BASE_URL } from "../../../public/config";
import "./PdfPage.css";

const PdfPage = () => {
  const { name } = useParams();
  const [loading, setLoading] = useState(true);

  const pdfUrl = `${BASE_URL}getPDF.php?name=${name}`; // Use the PHP script to serve the PDF

  useEffect(() => {
    // Simulate loading by setting a timeout (optional, for demonstration)
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="h-screen">
      {loading && ( // Show the loader while loading
        <div className="w-full h-screen flex justify-center items-center">
          <div className="absolute">
            <div className="loader"></div>
          </div>
        </div>
      )}
      {!loading && (
        <object className="pdf w-full h-screen" data={pdfUrl}></object>
      )}
    </div>
  );
};

export default PdfPage;
