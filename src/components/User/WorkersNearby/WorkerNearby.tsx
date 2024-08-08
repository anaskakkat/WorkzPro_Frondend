import React from 'react';
import { Card, CardContent, Typography, Grid } from '@mui/material';

interface Worker {
  id: string;
  name: string;
  title: string;
  description: string;
  distance: number;
}

const workers: Worker[] = [
  {
    id: '1',
    name: 'John Doe',
    title: 'Electrician',
    description: 'Experienced electrician with a focus on residential work.',
    distance: 2.5,
  },
];

const WorkerNearby: React.FC = () => {
  return (
    <div className="container mx-auto  border-2 my-16">
      <Grid container spacing={1}>
        {workers.map((worker) => (
          <Grid item xs={12} sm={6} md={4} key={worker.id}>
            <Card className="h-full">
              <CardContent className="flex flex-col justify-between">
                <div>
                  <Typography variant="h5" component="div">
                    {worker.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {worker.title}
                  </Typography>
                </div>
                <div>
                  <Typography variant="body2" color="text.secondary">
                    {worker.description}
                  </Typography>
                </div>
                <div className="flex justify-end">
                  <Typography variant="body2" color="primary.main">
                    {worker.distance} miles away
                  </Typography>
                </div>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default WorkerNearby;