import { useRouter } from "next/router";

const EventDetail = () => {
  const router = useRouter();
  const { eventId } = router.query;
  return <div>Event ID: {eventId}</div>;
};

export default withStyles(styles)(EventDetail);
