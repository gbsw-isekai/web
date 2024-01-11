import { Label } from "src/components/ui/label";
import { Input } from "src/components/ui/input";
import { Textarea } from "src/components/ui/textarea";

export default function AddReviewForm({
  data = {
    title: "",
    pro: "",
    con: "",
    welfareAndSalaryRating: 0,
    atmosphereRating: 0,
    workloadRating: 0,
    transportationRating: 0,
  },
  onDataChange,
}) {
  const formData = data;
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    onDataChange({
      ...formData,
      [name]: value,
    });
  };

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   onAddReview(formData);
  //   // You can add additional logic here, like clearing the form or closing a modal
  // };

  return (
    <form>
      <div className="mb-4">
        <Label htmlFor="title" className="block font-bold mb-2">
          제목
        </Label>
        <Input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleInputChange}
          required
        />
      </div>
      <div className="mb-4">
        <Label htmlFor="pro" className="block font-bold mb-2">
          장점
        </Label>
        <Textarea
          id="pro"
          name="pro"
          value={formData.pro}
          onChange={handleInputChange}
          required
        />
      </div>
      <div className="mb-4">
        <Label htmlFor="con" className="block font-bold mb-2">
          단점
        </Label>
        <Textarea
          id="con"
          name="con"
          value={formData.con}
          onChange={handleInputChange}
          required
        />
      </div>
      <div className="mb-4">
        <Label
          htmlFor="welfareAndSalaryRating"
          className="block font-bold mb-2"
        >
          복지&급여
        </Label>
        <Input
          type="number"
          id="welfareAndSalaryRating"
          name="welfareAndSalaryRating"
          value={formData.welfareAndSalaryRating}
          onChange={handleInputChange}
          min="0"
          max="5"
          step="0.1"
          required
        />
      </div>
      <div className="mb-4">
        <Label htmlFor="atmosphereRating" className="block font-bold mb-2">
          분위기
        </Label>
        <Input
          type="number"
          id="atmosphereRating"
          name="atmosphereRating"
          value={formData.atmosphereRating}
          onChange={handleInputChange}
          min="0"
          max="5"
          step="0.1"
          required
        />
      </div>
      <div className="mb-4">
        <Label htmlFor="workloadRating" className="block font-bold mb-2">
          업무 정도/강도
        </Label>
        <Input
          type="number"
          id="workloadRating"
          name="workloadRating"
          value={formData.workloadRating}
          onChange={handleInputChange}
          min="0"
          max="5"
          step="0.1"
          required
        />
      </div>
      <div className="mb-4">
        <Label htmlFor="transportationRating" className="block font-bold mb-2">
          교통
        </Label>
        <Input
          type="number"
          id="transportationRating"
          name="transportationRating"
          value={formData.transportationRating}
          onChange={handleInputChange}
          min="0"
          max="5"
          step="0.1"
          required
        />
      </div>
      {/* <Button type="submit">리뷰 달기</Button> */}
    </form>
  );
}
