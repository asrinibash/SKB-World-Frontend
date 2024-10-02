import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { server } from "../../main.jsx";
import { Button } from "../../Components/Static/Ui/Button";

export default function PaymentPage() {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const response = await axios.get(`${server}/course/${courseId}`);
        setCourse(response.data);
      } catch (err) {
        console.error("Error fetching course:", err);
        setError("Failed to fetch course details. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchCourse();
  }, [courseId]);

  const handlePayment = async () => {
    try {
      // Here you would typically integrate with a payment gateway
      // For now, we'll just simulate a successful payment
      const response = await axios.post(`${server}/payment/create-paypal-order`, { courseId });
      // Redirect to a success page or show a success message
      navigate("/payment-success", { state: { orderId: response.data.id } });
    } catch (error) {
      console.error("Payment error:", error);
      setError("Payment failed. Please try again.");
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (!course) return <div>Course not found</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Payment for {course.name}</h1>
      <p className="mb-4">Price: ${course.price.toFixed(2)}</p>
      <Button onClick={handlePayment}>Proceed to Payment</Button>
    </div>
  );
}
