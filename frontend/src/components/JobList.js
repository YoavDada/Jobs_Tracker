import React from 'react';
import JobItem from './JobItem';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';

const JobList = ({ jobs, onDelete, onStatusChange, onEdit }) => {
  const inProgressJobs = jobs.filter(job => job.in_progress);
  const closedJobs = jobs.filter(job => !job.in_progress);

  const handleDragEnd = (result) => {
    const { source, destination, draggableId } = result;

    if (!destination || source.droppableId === destination.droppableId) return;

    const jobId = parseInt(draggableId);
    const newStatus = destination.droppableId === 'in_progress';
    onStatusChange(jobId, newStatus);
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <div style={{ display: 'flex', gap: '20px' }}>
        
        {/* In Progress Column */}
        <Droppable droppableId="in_progress">
          {(provided) => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              style={{
                flex: 1,
                minHeight: '300px',
                background: '#e9f7ef',
                padding: '10px',
                borderRadius: '8px'
              }}
            >
              <h3>In Progress</h3>
              {inProgressJobs.map((job, index) => (
                <Draggable key={job.id} draggableId={String(job.id)} index={index}>
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      style={{
                        ...provided.draggableProps.style,
                        marginBottom: '10px'
                      }}
                    >
                      <JobItem job={job} onDelete={onDelete} onEdit={onEdit} />
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
              {inProgressJobs.length === 0 && (
                <p className="text-muted">No jobs here</p>
              )}
            </div>
          )}
        </Droppable>

        {/* Closed Column */}
        <Droppable droppableId="closed">
          {(provided) => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              style={{
                flex: 1,
                minHeight: '300px',
                background: '#f9e9e9',
                padding: '10px',
                borderRadius: '8px'
              }}
            >
              <h3>Closed</h3>
              {closedJobs.map((job, index) => (
                <Draggable key={job.id} draggableId={String(job.id)} index={index}>
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      style={{
                        ...provided.draggableProps.style,
                        marginBottom: '10px'
                      }}
                    >
                      <JobItem job={job} onDelete={onDelete} onEdit={onEdit} />
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
              {closedJobs.length === 0 && (
                <p className="text-muted">No jobs here</p>
              )}
            </div>
          )}
        </Droppable>

      </div>
    </DragDropContext>
  );
};

export default JobList;
