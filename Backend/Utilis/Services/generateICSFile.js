import { createEvent } from 'ics';
import fs from 'fs';
import path from 'path';

/**
 * Generate an ICS file for calendar invites
 * @param {Object} options
 * @param {string} options.title - Event title
 * @param {string} options.description - Event description
 * @param {Date} options.date - Event date (JavaScript Date object)
 * @param {string} options.startTime - Start time in "HH:mm" format
 * @param {string} options.endTime - End time in "HH:mm" format
 * @param {string} options.location - Event location
 * @param {string[]} options.attendees - Array of attendee emails
 * @returns {Promise<string>} - Path to the generated ICS file
 */
export const generateICS = async ({
  title,
  description,
  date,
  startTime,
  endTime,
  location,
  attendees = []
}) => {
  return new Promise((resolve, reject) => {
    // Convert date + time to ICS array format
    const parseTime = (timeStr) => {
      const [hour, minute] = timeStr.split(':').map(Number);
      return [date.getFullYear(), date.getMonth() + 1, date.getDate(), hour, minute];
    };

    const event = {
      title,
      description,
      location,
      start: parseTime(startTime),
      end: parseTime(endTime),
      status: 'CONFIRMED',
      busyStatus: 'BUSY',
      attendees: attendees.map(email => ({ name: email, email }))
    };

    createEvent(event, (error, value) => {
      if (error) return reject(error);

      const fileName = `event-${Date.now()}.ics`;
      const filePath = path.join(process.cwd(), 'temp', fileName);

      // Ensure temp folder exists
      fs.mkdirSync(path.join(process.cwd(), 'temp'), { recursive: true });

      fs.writeFile(filePath, value, (err) => {
        if (err) return reject(err);
        resolve(filePath);
      });
    });
  });
};
