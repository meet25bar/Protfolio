import { zodResolver } from '@hookform/resolvers/zod'
import {
  ArrowLeft,
  BriefcaseBusiness,
  Calendar,
  Camera,
  FileUp,
  MapPin,
  Phone,
  UserRound,
} from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { z } from 'zod'
import { Button, Card, PageHeader } from '../components/ui'
import { useToast } from '../components/ToastProvider'
import { useAdminStore } from '../store/useAdminStore'

const employeeSchema = z.object({
  firstName: z.string().min(2, 'First name is required'),
  lastName: z.string().min(2, 'Last name is required'),
  phone: z.string().min(10, 'Enter a valid phone number'),
  email: z.string().email('Enter a valid email address'),
  dateOfBirth: z.string().min(1, 'Select a date of birth'),
  gender: z.string().min(1),
  address1: z.string().min(4, 'Address is required'),
  address2: z.string().optional(),
  district: z.string().min(1),
  city: z.string().min(2, 'City or village is required'),
  state: z.string().min(1),
  pinCode: z.string().regex(/^\d{6}$/, 'Enter a six-digit PIN code'),
  employeeId: z.string().min(3),
  role: z.string().min(1),
  department: z.string().min(1),
  joiningDate: z.string().min(1),
  employmentType: z.string().min(1),
  manager: z.string().min(1),
  salary: z.coerce.number().min(1, 'Enter the monthly salary'),
  emergencyName: z.string().min(2),
  relationship: z.string().min(1),
  emergencyPhone: z.string().min(10),
  regions: z.array(z.string()).min(1, 'Select at least one region'),
})

export type EmployeeFormValues = z.infer<typeof employeeSchema>

const SectionTitle = ({ icon: Icon, children }: { icon: typeof UserRound; children: string }) => (
  <h2 className="mb-5 flex items-center gap-2 text-lg font-bold text-ink">
    <Icon size={20} className="text-brand-700" />
    {children}
  </h2>
)

export function EmployeeFormPage() {
  const navigate = useNavigate()
  const notify = useToast().notify
  const saveEmployeeDraft = useAdminStore((state) => state.saveEmployeeDraft)
  const [uploadName, setUploadName] = useState('')
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EmployeeFormValues>({
    resolver: zodResolver(employeeSchema),
    defaultValues: {
      employeeId: 'EMP-8496',
      role: 'Field Agent',
      department: 'Soil Testing',
      joiningDate: '2026-01-15',
      gender: 'Male',
      state: 'Gujarat',
      district: 'Anand',
      employmentType: 'Full Time',
      manager: 'Rajesh Sharma (Supervisor)',
      relationship: 'Spouse',
      regions: ['Anand', 'Mehsana', 'Kheda'],
    },
  })

  const submit = (values: EmployeeFormValues) => {
    sessionStorage.setItem('kisansangam:employee-draft', JSON.stringify({ ...values, uploadName }))
    navigate('/employees/new/review')
  }

  const saveDraft = (values: EmployeeFormValues) => {
    saveEmployeeDraft({
      name: `${values.firstName || ''} ${values.lastName || ''}`.trim(),
      role: values.role,
      department: values.department,
      mobile: values.phone,
      district: values.district,
      joiningDate: values.joiningDate,
    })
    notify('Employee saved as draft')
    navigate('/employees')
  }

  const FieldError = ({ name }: { name: keyof EmployeeFormValues }) =>
    errors[name] ? <p className="mt-1 text-xs text-red-600">{String(errors[name]?.message)}</p> : null

  return (
    <div>
      <button className="mb-4 flex items-center gap-2 text-sm font-medium text-muted hover:text-brand-700" onClick={() => navigate('/employees')}>
        <ArrowLeft size={17} /> Employees <span className="text-slate-300">/</span> <span className="text-brand-700">Add New Employee</span>
      </button>
      <PageHeader title="Add New Employee" description="Fill in the details to register a new field employee" />
      <form onSubmit={handleSubmit(submit)}>
        <div className="grid grid-cols-2 items-start gap-6">
          <div className="space-y-6">
            <Card className="p-6">
              <SectionTitle icon={UserRound}>Personal Information</SectionTitle>
              <div className="mb-5 flex items-center gap-4">
                <label className="flex h-20 w-20 cursor-pointer items-center justify-center rounded-full border border-dashed border-line bg-workspace text-muted hover:border-brand-700">
                  <Camera size={25} />
                  <span className="sr-only">Upload profile photo</span>
                  <input type="file" accept="image/png,image/jpeg" className="hidden" onChange={(event) => setUploadName(event.target.files?.[0]?.name || '')} />
                </label>
                <div>
                  <p className="font-semibold">Profile Photo</p>
                  <p className="text-xs text-muted">Upload a clear passport size photo. JPG, PNG formats accepted (max 2MB).</p>
                  <p className="mt-1 text-sm font-semibold text-brand-700">{uploadName || 'Upload Photo'}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <label><span className="field-label">First Name *</span><input className="field" placeholder="Enter first name" {...register('firstName')} /><FieldError name="firstName" /></label>
                <label><span className="field-label">Last Name *</span><input className="field" placeholder="Enter last name" {...register('lastName')} /><FieldError name="lastName" /></label>
                <label><span className="field-label">Phone Number *</span><input className="field" placeholder="+91 98765 43210" {...register('phone')} /><FieldError name="phone" /></label>
                <label><span className="field-label">Email Address *</span><input className="field" type="email" placeholder="name@kisansangam.com" {...register('email')} /><FieldError name="email" /></label>
                <label><span className="field-label">Date of Birth *</span><input className="field" type="date" {...register('dateOfBirth')} /><FieldError name="dateOfBirth" /></label>
                <label><span className="field-label">Gender *</span><select className="field" {...register('gender')}><option>Male</option><option>Female</option><option>Other</option></select></label>
              </div>
            </Card>
            <Card className="p-6">
              <SectionTitle icon={MapPin}>Address Details</SectionTitle>
              <div className="grid grid-cols-2 gap-4">
                <label className="col-span-2"><span className="field-label">Address Line 1 *</span><input className="field" placeholder="House no, Street name, Landmark" {...register('address1')} /><FieldError name="address1" /></label>
                <label className="col-span-2"><span className="field-label">Address Line 2</span><input className="field" placeholder="Area, Locality" {...register('address2')} /></label>
                <label><span className="field-label">District *</span><select className="field" {...register('district')}><option>Anand</option><option>Mehsana</option><option>Vadodara</option><option>Rajkot</option></select></label>
                <label><span className="field-label">City/Village *</span><input className="field" placeholder="Enter city or village" {...register('city')} /><FieldError name="city" /></label>
                <label><span className="field-label">State *</span><select className="field" {...register('state')}><option>Gujarat</option></select></label>
                <label><span className="field-label">PIN Code *</span><input className="field" placeholder="388001" {...register('pinCode')} /><FieldError name="pinCode" /></label>
              </div>
            </Card>
            <Card className="p-6">
              <SectionTitle icon={Phone}>Emergency Contact</SectionTitle>
              <div className="grid grid-cols-2 gap-4">
                <label><span className="field-label">Contact Name *</span><input className="field" placeholder="Enter kin name" {...register('emergencyName')} /><FieldError name="emergencyName" /></label>
                <label><span className="field-label">Relationship *</span><select className="field" {...register('relationship')}><option>Spouse</option><option>Parent</option><option>Sibling</option></select></label>
                <label className="col-span-2"><span className="field-label">Phone Number *</span><input className="field" placeholder="+91 98765 01234" {...register('emergencyPhone')} /><FieldError name="emergencyPhone" /></label>
              </div>
            </Card>
          </div>
          <div className="space-y-6">
            <Card className="p-6">
              <SectionTitle icon={BriefcaseBusiness}>Employment Details</SectionTitle>
              <div className="grid grid-cols-2 gap-4">
                <label><span className="field-label">Employee ID *</span><input className="field bg-slate-100" readOnly {...register('employeeId')} /></label>
                <label><span className="field-label">Role *</span><select className="field" {...register('role')}><option>Field Agent</option><option>Field Supervisor</option><option>Verification Officer</option><option>Content Reviewer</option></select></label>
                <label><span className="field-label">Department *</span><select className="field" {...register('department')}><option>Soil Testing</option><option>Operations</option><option>Data Management</option></select></label>
                <label><span className="field-label">Joining Date *</span><input className="field" type="date" {...register('joiningDate')} /></label>
                <fieldset className="col-span-2">
                  <legend className="field-label">Employment Type *</legend>
                  <div className="flex gap-5">
                    {['Full Time', 'Part Time', 'Contract'].map((type) => <label key={type} className="flex items-center gap-2 text-sm"><input type="radio" value={type} className="accent-brand-700" {...register('employmentType')} />{type}</label>)}
                  </div>
                </fieldset>
                <label><span className="field-label">Reporting Manager *</span><select className="field" {...register('manager')}><option>Rajesh Sharma (Supervisor)</option><option>Nisha Patel (Operations)</option></select></label>
                <label><span className="field-label">Monthly Salary *</span><input className="field" type="number" placeholder="₹ e.g. 25,000" {...register('salary')} /><FieldError name="salary" /></label>
              </div>
            </Card>
            <Card className="p-6">
              <SectionTitle icon={MapPin}>Assigned Regions</SectionTitle>
              <p className="mb-4 text-sm text-muted">Employee will be assigned tasks from selected regions</p>
              <div className="grid grid-cols-2 gap-3">
                {['Anand', 'Rajkot', 'Mehsana', 'Kheda', 'Vadodara', 'Junagadh', 'Surat', 'Amreli'].map((region) => (
                  <label key={region} className="flex items-center gap-2 text-sm">
                    <input type="checkbox" value={region} className="h-4 w-4 accent-brand-700" {...register('regions')} />
                    {region}
                  </label>
                ))}
              </div>
              <FieldError name="regions" />
            </Card>
            <Card className="p-6">
              <SectionTitle icon={FileUp}>Document Upload</SectionTitle>
              <label className="flex h-24 cursor-pointer flex-col items-center justify-center rounded-lg border border-dashed border-line bg-workspace text-sm text-muted hover:border-brand-700">
                <FileUp className="mb-2 text-brand-700" size={22} />
                {uploadName || 'Click to upload or drag & drop'}
                <input type="file" className="hidden" onChange={(event) => setUploadName(event.target.files?.[0]?.name || '')} />
              </label>
            </Card>
            <Card className="flex items-center gap-3 p-5 text-sm text-muted">
              <Calendar size={18} className="text-brand-700" />
              Employee ID and onboarding tasks will be generated after confirmation.
            </Card>
          </div>
        </div>
        <div className="sticky bottom-0 mt-6 flex items-center justify-between rounded-xl border border-line bg-white p-4 shadow-[0_-8px_24px_rgba(20,69,23,0.06)]">
          <Button type="button" tone="secondary" onClick={() => navigate('/employees')}>Cancel</Button>
          <div className="flex gap-3">
            <Button type="button" tone="secondary" onClick={handleSubmit(saveDraft)}>Save as Draft</Button>
            <Button type="submit">Add Employee</Button>
          </div>
        </div>
      </form>
    </div>
  )
}
