'use client';

import React, { useState } from 'react';
import {
  Search,
  ChevronUp,
  ChevronDown,
  Eye,
  Download,
  Filter,
  CheckCircle,
  Clock,
  XCircle,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';

type Donation = {
  id: string;
  donor: string;
  email: string;
  campaign: string;
  amount: string;
  currency: string;
  method: 'M-Pesa' | 'Stripe' | 'PayPal';
  status: 'Confirmed' | 'Pending' | 'Failed';
  date: string;
  country: string;
};

const donations: Donation[] = [
  { id: 'don-001', donor: 'Margaret Wanjiku', email: 'margaret.w@gmail.com', campaign: 'School Block B', amount: '5,000', currency: 'KES', method: 'M-Pesa', status: 'Confirmed', date: '17 Jul 2026', country: 'Kenya' },
  { id: 'don-002', donor: 'Sarah Thompson', email: 'sarah.t@outlook.com', campaign: 'School Block B', amount: '30', currency: 'GBP', method: 'Stripe', status: 'Confirmed', date: '17 Jul 2026', country: 'UK' },
  { id: 'don-003', donor: 'Anonymous', email: '—', campaign: 'Clean Water', amount: '50', currency: 'USD', method: 'PayPal', status: 'Confirmed', date: '17 Jul 2026', country: '—' },
  { id: 'don-004', donor: 'David Omondi', email: 'david.o@yahoo.com', campaign: 'Child Sponsorship', amount: '2,500', currency: 'KES', method: 'M-Pesa', status: 'Pending', date: '16 Jul 2026', country: 'Kenya' },
  { id: 'don-005', donor: 'James Kariuki', email: 'james.k@gmail.com', campaign: 'General Fund', amount: '10,000', currency: 'KES', method: 'M-Pesa', status: 'Confirmed', date: '16 Jul 2026', country: 'Kenya' },
  { id: 'don-006', donor: 'Amelia Ndung\'u', email: 'amelia.n@gmail.com', campaign: 'Health Outreach', amount: '25', currency: 'EUR', method: 'Stripe', status: 'Confirmed', date: '16 Jul 2026', country: 'Germany' },
  { id: 'don-007', donor: 'Peter Mwangi', email: 'peter.m@icloud.com', campaign: 'Church Planting', amount: '1,500', currency: 'KES', method: 'M-Pesa', status: 'Pending', date: '15 Jul 2026', country: 'Kenya' },
  { id: 'don-008', donor: 'Grace Achieng', email: 'grace.a@gmail.com', campaign: 'Clean Water', amount: '3,000', currency: 'KES', method: 'M-Pesa', status: 'Failed', date: '15 Jul 2026', country: 'Kenya' },
  { id: 'don-009', donor: 'Michael van der Berg', email: 'm.vdb@hotmail.com', campaign: 'School Block B', amount: '75', currency: 'EUR', method: 'PayPal', status: 'Confirmed', date: '15 Jul 2026', country: 'Netherlands' },
  { id: 'don-010', donor: 'Esther Njeri', email: 'esther.n@gmail.com', campaign: 'Child Sponsorship', amount: '30,000', currency: 'KES', method: 'M-Pesa', status: 'Confirmed', date: '14 Jul 2026', country: 'Kenya' },
  { id: 'don-011', donor: 'Robert Kimani', email: 'robert.k@gmail.com', campaign: 'General Fund', amount: '500', currency: 'KES', method: 'M-Pesa', status: 'Pending', date: '14 Jul 2026', country: 'Kenya' },
  { id: 'don-012', donor: 'Christine Mutua', email: 'christine.m@yahoo.com', campaign: 'Health Outreach', amount: '1,200', currency: 'KES', method: 'M-Pesa', status: 'Confirmed', date: '13 Jul 2026', country: 'Kenya' },
];

const statusConfig = {
  Confirmed: { icon: CheckCircle, className: 'bg-accent/20 text-primary border-accent/30' },
  Pending: { icon: Clock, className: 'bg-warning/10 text-warning border-warning/30' },
  Failed: { icon: XCircle, className: 'bg-danger/10 text-danger border-danger/20' },
};

const methodConfig = {
  'M-Pesa': 'bg-primary/10 text-primary',
  'Stripe': 'bg-blue-50 text-blue-700',
  'PayPal': 'bg-gold/10 text-warning',
};

export default function RecentDonationsTable() {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [sortCol, setSortCol] = useState<string>('date');
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('desc');
  const [page, setPage] = useState(1);
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const perPage = 8;

  const filtered = donations.filter((d) => {
    const matchSearch =
      d.donor.toLowerCase().includes(search.toLowerCase()) ||
      d.campaign.toLowerCase().includes(search.toLowerCase()) ||
      d.email.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === 'All' || d.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const sorted = [...filtered].sort((a, b) => {
    if (sortCol === 'amount') {
      const aNum = parseFloat(a.amount.replace(/,/g, ''));
      const bNum = parseFloat(b.amount.replace(/,/g, ''));
      return sortDir === 'asc' ? aNum - bNum : bNum - aNum;
    }
    return sortDir === 'asc'
      ? a[sortCol as keyof Donation]?.localeCompare(b[sortCol as keyof Donation] as string)
      : b[sortCol as keyof Donation]?.localeCompare(a[sortCol as keyof Donation] as string);
  });

  const totalPages = Math.ceil(sorted.length / perPage);
  const paginated = sorted.slice((page - 1) * perPage, page * perPage);

  const toggleSort = (col: string) => {
    if (sortCol === col) setSortDir(sortDir === 'asc' ? 'desc' : 'asc');
    else { setSortCol(col); setSortDir('desc'); }
  };

  const toggleRow = (id: string) => {
    setSelectedRows((prev) =>
      prev.includes(id) ? prev.filter((r) => r !== id) : [...prev, id]
    );
  };

  const toggleAll = () => {
    if (selectedRows.length === paginated.length) setSelectedRows([]);
    else setSelectedRows(paginated.map((d) => d.id));
  };

  const SortIcon = ({ col }: { col: string }) => (
    <span className="inline-flex flex-col ml-1 opacity-50">
      <ChevronUp size={10} className={sortCol === col && sortDir === 'asc' ? 'opacity-100 text-primary' : ''} />
      <ChevronDown size={10} className={sortCol === col && sortDir === 'desc' ? 'opacity-100 text-primary' : ''} />
    </span>
  );

  return (
    <div className="bg-card rounded-2xl border border-border shadow-card overflow-hidden">
      {/* Header */}
      <div className="px-5 py-4 border-b border-border flex flex-wrap items-center gap-3 justify-between">
        <div>
          <h3 className="font-bold text-foreground text-base">Recent Donations</h3>
          <p className="text-xs text-muted-foreground mt-0.5">{filtered.length} records</p>
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          {/* Search */}
          <div className="relative">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search donor or campaign..."
              value={search}
              onChange={(e) => { setSearch(e.target.value); setPage(1); }}
              className="pl-8 pr-3 py-2 rounded-xl border border-border bg-input text-xs focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 w-44 transition-all"
            />
          </div>

          {/* Status Filter */}
          <div className="flex items-center gap-1">
            {['All', 'Confirmed', 'Pending', 'Failed'].map((s) => (
              <button
                key={`sf-${s}`}
                onClick={() => { setStatusFilter(s); setPage(1); }}
                className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  statusFilter === s
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                }`}
              >
                {s}
              </button>
            ))}
          </div>

          {/* Export */}
          <button
            aria-label="Export donations CSV"
            className="flex items-center gap-1.5 border border-border text-muted-foreground px-3 py-2 rounded-xl text-xs font-medium hover:bg-muted hover:text-foreground transition-colors"
          >
            <Download size={13} />
            Export
          </button>
        </div>
      </div>

      {/* Bulk Action Bar */}
      <div
        className={`bg-primary/5 border-b border-primary/20 px-5 py-2.5 flex items-center gap-3 transition-all duration-200 ${
          selectedRows.length > 0 ? 'opacity-100 max-h-12' : 'opacity-0 max-h-0 overflow-hidden py-0 border-0'
        }`}
      >
        <span className="text-xs font-semibold text-primary">{selectedRows.length} selected</span>
        <button className="text-xs font-semibold text-primary hover:underline">Mark Confirmed</button>
        <button className="text-xs font-semibold text-danger hover:underline">Export Selected</button>
        <button onClick={() => setSelectedRows([])} className="text-xs text-muted-foreground hover:text-foreground ml-auto">
          Clear
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border bg-muted/50">
              <th className="px-4 py-3 text-left w-10">
                <input
                  type="checkbox"
                  checked={selectedRows.length === paginated.length && paginated.length > 0}
                  onChange={toggleAll}
                  className="w-3.5 h-3.5 rounded border-border accent-primary"
                  aria-label="Select all rows"
                />
              </th>
              {[
                { label: 'Donor', col: 'donor' },
                { label: 'Campaign', col: 'campaign' },
                { label: 'Amount', col: 'amount' },
                { label: 'Method', col: 'method' },
                { label: 'Status', col: 'status' },
                { label: 'Country', col: 'country' },
                { label: 'Date', col: 'date' },
              ].map(({ label, col }) => (
                <th
                  key={`th-${col}`}
                  onClick={() => toggleSort(col)}
                  className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider cursor-pointer hover:text-primary transition-colors select-none whitespace-nowrap"
                >
                  {label}
                  <SortIcon col={col} />
                </th>
              ))}
              <th className="px-4 py-3 text-right text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {paginated.length === 0 ? (
              <tr>
                <td colSpan={9} className="px-4 py-12 text-center">
                  <div className="flex flex-col items-center gap-2">
                    <Filter size={28} className="text-muted-foreground/40" />
                    <p className="text-sm font-semibold text-muted-foreground">No donations match your filters</p>
                    <p className="text-xs text-muted-foreground">Try adjusting your search or status filter</p>
                  </div>
                </td>
              </tr>
            ) : (
              paginated.map((donation, i) => {
                const StatusIcon = statusConfig[donation.status].icon;
                const isSelected = selectedRows.includes(donation.id);
                return (
                  <tr
                    key={donation.id}
                    className={`border-b border-border transition-colors cursor-pointer ${
                      isSelected ? 'bg-primary/5' : i % 2 === 0 ? 'bg-card hover:bg-muted/40' : 'bg-muted/20 hover:bg-muted/50'
                    }`}
                    onClick={() => toggleRow(donation.id)}
                  >
                    <td className="px-4 py-3.5">
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => toggleRow(donation.id)}
                        onClick={(e) => e.stopPropagation()}
                        className="w-3.5 h-3.5 rounded border-border accent-primary"
                        aria-label={`Select ${donation.donor}`}
                      />
                    </td>
                    <td className="px-4 py-3.5">
                      <div>
                        <p className="font-semibold text-foreground text-sm leading-tight">{donation.donor}</p>
                        <p className="text-xs text-muted-foreground">{donation.email}</p>
                      </div>
                    </td>
                    <td className="px-4 py-3.5">
                      <span className="text-xs font-medium text-foreground">{donation.campaign}</span>
                    </td>
                    <td className="px-4 py-3.5">
                      <span className="font-bold text-foreground stat-number text-sm">
                        {donation.currency} {donation.amount}
                      </span>
                    </td>
                    <td className="px-4 py-3.5">
                      <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${methodConfig[donation.method]}`}>
                        {donation.method}
                      </span>
                    </td>
                    <td className="px-4 py-3.5">
                      <span className={`inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full border ${statusConfig[donation.status].className}`}>
                        <StatusIcon size={11} />
                        {donation.status}
                      </span>
                    </td>
                    <td className="px-4 py-3.5 text-xs text-muted-foreground font-medium">
                      {donation.country}
                    </td>
                    <td className="px-4 py-3.5 text-xs text-muted-foreground font-medium whitespace-nowrap">
                      {donation.date}
                    </td>
                    <td className="px-4 py-3.5">
                      <div className="flex items-center justify-end gap-1">
                        <button
                          onClick={(e) => e.stopPropagation()}
                          aria-label={`View donation from ${donation.donor}`}
                          title={`View details for ${donation.donor}`}
                          className="w-7 h-7 rounded-lg hover:bg-muted flex items-center justify-center transition-colors group"
                        >
                          <Eye size={13} className="text-muted-foreground group-hover:text-primary" />
                        </button>
                        <button
                          onClick={(e) => e.stopPropagation()}
                          aria-label={`Download receipt for ${donation.donor}`}
                          title="Download tax receipt PDF"
                          className="w-7 h-7 rounded-lg hover:bg-muted flex items-center justify-center transition-colors group"
                        >
                          <Download size={13} className="text-muted-foreground group-hover:text-primary" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="px-5 py-3.5 border-t border-border flex items-center justify-between flex-wrap gap-3">
        <p className="text-xs text-muted-foreground">
          Showing {Math.min((page - 1) * perPage + 1, sorted.length)}–{Math.min(page * perPage, sorted.length)} of {sorted.length} donations
        </p>
        <div className="flex items-center gap-1">
          <button
            onClick={() => setPage((p) => Math.max(p - 1, 1))}
            disabled={page === 1}
            className="w-8 h-8 rounded-lg border border-border flex items-center justify-center hover:bg-muted disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            aria-label="Previous page"
          >
            <ChevronLeft size={14} />
          </button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
            <button
              key={`page-${p}`}
              onClick={() => setPage(p)}
              className={`w-8 h-8 rounded-lg text-xs font-semibold transition-colors ${
                page === p
                  ? 'bg-primary text-primary-foreground'
                  : 'border border-border text-muted-foreground hover:bg-muted hover:text-foreground'
              }`}
            >
              {p}
            </button>
          ))}
          <button
            onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
            disabled={page === totalPages}
            className="w-8 h-8 rounded-lg border border-border flex items-center justify-center hover:bg-muted disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            aria-label="Next page"
          >
            <ChevronRight size={14} />
          </button>
        </div>
      </div>
    </div>
  );
}
