# Sprint 10 — Enhanced Retrospective Simulator

**Goal**: Enhance the "Interactive Retrospective Simulator" by adding two new facilitation techniques (TRIZ and 15% Solutions) to better demonstrate the value of the course and increase user engagement.

## Sprint Backlog

**P0 - UI/UX & Prototyping:**

- **S10-001 (UX)**: Update the design of the widget to include a format selection step.
  - **AC**: A new mockup is created that shows the three format choices.
- **S10-002 (PMM)**: Write the copy for the new formats (TRIZ and 15% Solutions).
  - **AC**: All copy for the new formats is written and approved.
- **S10-003 (FE/UX)**: Update the technical prototype (`proto-retro-simulator.html`) to include the new formats and the selection step.
  - **AC**: The prototype is updated with the new functionality.

**P1 - Implementation:**

- **S10-004 (FE)**: Integrate the enhanced "Interactive Retrospective Simulator" (with 3 formats) into the `index.html` page.
  - **AC**: The widget is present on the landing page and is fully functional with all three formats.
- **S10-005 (AN/FE)**: Update the analytics tracking to include the choice of format.
  - **AC**: A new parameter `format` is added to the tracking events.

**P2 - Quality & Documentation:**

- **S10-006 (QA)**: Update the E2E tests to cover the new formats.
  - **AC**: Tests are updated and pass successfully.
- **S10-007 (PMM)**: Update the `README.md` file with information about the enhanced widget and the different formats.
  - **AC**: `README.md` is updated.