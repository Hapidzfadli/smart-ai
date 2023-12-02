import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";

function CardProduct({ id, title, description, image, onSelect, isSelected }) {
  return (
    <Card
      className={`rounded-lg cursor-pointer ${
        isSelected ? "border-2 border-blue-500" : ""
      }`}
      onClick={() => onSelect(id)}
    >
      <CardHeader shadow={false} floated={false} className="h-60 rounded-lg">
        <img src={image} alt={title} className="h-full w-full object-cover" />
      </CardHeader>
      <CardBody>
        <div className="mb-2 flex items-center justify-between">
          <Typography color="blue-gray" className="font-medium">
            {title}
          </Typography>
        </div>
        <Typography
          variant="small"
          color="gray"
          className="font-normal opacity-75"
        >
          {description}
        </Typography>
      </CardBody>
      <CardFooter className="pt-0">
        <Button
          ripple={false}
          fullWidth={true}
          className="bg-gray-500 text-white shadow-none hover:scale-105 hover:shadow-none focus:scale-105 focus:shadow-none active:scale-100"
        >
          Add Item
        </Button>
      </CardFooter>
    </Card>
  );
}

export default CardProduct;
