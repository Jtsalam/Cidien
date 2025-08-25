import React, { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Checkbox } from '@/components/ui/checkbox';
import { AlertCircle, User, Bed, X, Stethoscope } from 'lucide-react';

interface Bed {
  bed_id: number;
  bed_letter: string;
  room_id: number;
  assigned_patient_id?: number | null;
  assigned_nurse_id?: number | null;
  is_assigned?: boolean;
  is_available?: boolean;
}

interface AssignBedPopupProps {
  open: boolean;
  onClose: () => void;
  onSave: (data: {
    patientName: string;
    nurseId: number | null;
    assignToAllBeds: boolean;
  }) => void;
  onDischarge?: (data: { dischargePatient: boolean }) => void;
  centerId: number;
  roomId: number;
  bed: Bed & {
    assigned_patient?: { patient_name: string; patient_id: number } | null;
    assigned_nurse?: { user_name: string; user_id: number } | null;
  };
}

interface NurseOption {
  user_id: number;
  user_name: string;
}

const AssignBedPopup: React.FC<AssignBedPopupProps> = ({
  open,
  onClose,
  onSave,
  onDischarge,
  centerId,
  roomId,
  bed,
}) => {
  const [patientName, setPatientName] = useState('');
  const [nurseSearch, setNurseSearch] = useState('');
  const [filteredNurses, setFilteredNurses] = useState<NurseOption[]>([]);
  const [selectedNurse, setSelectedNurse] = useState<NurseOption | null>(null);
  const [assignToAllBeds, setAssignToAllBeds] = useState(false);
  const [warning, setWarning] = useState(false);
  const [isDischarging, setIsDischarging] = useState(false);

  // Pre-fill patient and nurse info when popup opens with bed info
  useEffect(() => {
    if (open && bed) {
      setPatientName(bed.assigned_patient?.patient_name || '');
      if (bed.assigned_nurse) {
        setSelectedNurse({
          user_id: bed.assigned_nurse.user_id,
          user_name: bed.assigned_nurse.user_name,
        });
        setNurseSearch(bed.assigned_nurse.user_name);
      } else {
        setSelectedNurse(null);
        setNurseSearch('');
      }
    }
  }, [open, bed]);
  
  // Fetch nurses based on nurseSearch input
  useEffect(() => {
    const fetchNurses = async () => {
      if (!nurseSearch) return setFilteredNurses([]);

      try {
        const res = await fetch(`/api/staff/RoomMngr/nurses?centerId=${centerId}&search=${nurseSearch}`);
        const data = await res.json();
        if (res.ok) {
          setFilteredNurses(data.nurses);
        }
      } catch (err) {
        console.error('Error fetching nurses:', err);
      }
    };

    const debounce = setTimeout(() => fetchNurses(), 300);
    return () => clearTimeout(debounce);
  }, [nurseSearch, centerId]);

  // Check if there are any changes made
  const hasChanges = () => {
    const currentPatientName = bed.assigned_patient?.patient_name || '';
    const currentNurseId = bed.assigned_nurse?.user_id || null;
    
    return patientName !== currentPatientName || 
           selectedNurse?.user_id !== currentNurseId ||
           assignToAllBeds;
  };

  const handleSave = () => {
    // If no changes were made, just close the popup
    if (!hasChanges()) {
      onClose();
      return;
    }

    if (assignToAllBeds && !selectedNurse) {
      setWarning(true);
      return;
    }
    setWarning(false);
    onSave({
      patientName,
      nurseId: selectedNurse?.user_id || null,
      assignToAllBeds,
    });
    onClose();
  };

  const handleDischarge = async (dischargePatient: boolean) => {
    if (!onDischarge) return;
    
    setIsDischarging(true);
    try {
      await onDischarge({ dischargePatient });
    } finally {
      setIsDischarging(false);
    }
  };

  const resetState = () => {
    setPatientName('');
    setNurseSearch('');
    setFilteredNurses([]);
    setSelectedNurse(null);
    setAssignToAllBeds(false);
    setWarning(false);
    setIsDischarging(false);
  };

  // Reset form state when popup closes
  useEffect(() => {
    if (!open) resetState();
  }, [open]);

  const hasExistingAssignment = bed.assigned_patient || bed.assigned_nurse;

  const isNurseSelectionIncomplete = nurseSearch !== '' && !selectedNurse;

  const isSaveDisabled = isNurseSelectionIncomplete || (hasExistingAssignment && !hasChanges());

  const getSaveButtonTitle = () => {
    if (isNurseSelectionIncomplete) return 'Select a valid nurse from the list or clear the search.';
    if (hasExistingAssignment && !hasChanges()) return 'No changes made';
    return '';
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Bed className="w-5 h-5" />
            {hasExistingAssignment ? 'Manage Bed Assignment' : 'Assign Bed'}
          </DialogTitle>
        </DialogHeader>

        {/* Current Assignment Display */}
        {hasExistingAssignment && (
          <div className="bg-gray-50 p-3 rounded-lg mb-4">
            <h4 className="text-sm font-medium text-gray-900 mb-2">Current Assignment</h4>
            <div className="space-y-1 text-sm">
              {bed.assigned_patient && (
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4 text-gray-500" />
                  <span className="text-gray-700">Patient: {bed.assigned_patient.patient_name}</span>
                </div>
              )}
              {bed.assigned_nurse && (
                <div className="flex items-center gap-2">
                  <Stethoscope className="w-4 h-4 text-gray-500" />
                  <span className="text-gray-700">Nurse: {bed.assigned_nurse.user_name}</span>
                </div>
              )}
            </div>
          </div>
        )}

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium">Patient Name / Initials</label>
            <Input
              value={patientName}
              onChange={(e) => setPatientName(e.target.value)}
              placeholder="Enter patient name or initials"
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Nurse</label>
            <Input
              value={nurseSearch || selectedNurse?.user_name || ''}
              onChange={(e) => {
                setNurseSearch(e.target.value);
                setSelectedNurse(null);
              }}
              placeholder="Search nurse by name"
            />
            {filteredNurses.length > 0 && (
              <ul className="border rounded mt-1 max-h-28 overflow-auto">
                {filteredNurses.map((nurse) => (
                  <li
                    key={nurse.user_id}
                    className={`p-2 text-sm cursor-pointer hover:bg-gray-100 ${
                      selectedNurse?.user_id === nurse.user_id ? 'bg-blue-100' : ''
                    }`}
                    onClick={() => {
                      setSelectedNurse(nurse);
                      setNurseSearch('');
                    }}
                  >
                    {nurse.user_name}
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="flex items-center gap-2">
            <Checkbox checked={assignToAllBeds} onCheckedChange={(val) => setAssignToAllBeds(!!val)} />
            <label className="text-sm">Assign nurse to all beds in room</label>
          </div>

          {warning && (
            <div className="text-sm text-red-600 flex items-center gap-1">
              <AlertCircle className="w-4 h-4" /> Please select a nurse before assigning to all beds
            </div>
          )}
        </div>

        <DialogFooter className="flex justify-between items-center">
          <div className="space-x-2">
            {hasExistingAssignment && onDischarge && (
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleDischarge(false)}
                  disabled={isDischarging}
                >
                  {isDischarging ? 'Clearing...' : 'Clear Assignment'}
                </Button>
                {bed.assigned_patient && (
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleDischarge(true)}
                    disabled={isDischarging}
                  >
                    {isDischarging ? 'Discharging...' : 'Discharge Patient'}
                  </Button>
                )}
              </div>
            )}
          </div>
          <div className="space-x-2">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button 
              onClick={handleSave}
              disabled={isSaveDisabled}
              className={isSaveDisabled ? 'opacity-50 cursor-not-allowed' : ''}
              title={getSaveButtonTitle()}
            >
              {hasExistingAssignment ? 'Update Assignment' : 'Assign Bed'}
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AssignBedPopup;
